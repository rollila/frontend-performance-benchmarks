import CDP from "chrome-remote-interface";
import fs from "fs";

import * as parser from "./result-parser.js";
import * as page from "./page.js";

const runHandler = async (url, testGroupNr, handler) => {
  const tab = await CDP.New();
  await CDP.Activate({ id: tab.id });
  const results = await new Promise((resolve, reject) => {
    CDP(async (client) => {
      try {
        const { DOM, Page, Profiler } = client;
        await Page.enable();
        await Profiler.enable();

        await Profiler.setSamplingInterval({ interval: 250 });

        Page.loadEventFired(async () => {
          const document = await DOM.getDocument();
          await page.waitUntilLoaded(client)(document.root.nodeId);
          await page.click(client)(`#btn-scen-${testGroupNr}`);
          const { trace, metrics } = await handler(
            client,
            document.root.nodeId
          );
          await client.close();
          resolve({ trace, metrics });
        });

        await Page.navigate({
          url,
        });
      } catch (err) {
        await client.close();
        reject(err);
      }
    });
  });
  await CDP.Close({ id: tab.id });
  return results;
};

export const runTest = async (
  handler,
  { scenario, repetitions, url, framework }
) => {
  const group = scenario.split("_")[0][5];
  let scriptTime = 0;
  let totalTime = 0;
  let gc = 0;
  let metrics = [];
  let raw = [];

  for (let i = 0; i < repetitions; i += 1) {
    const result = await runHandler(url, group, handler);
    const parse = parser.parseProfile(result.trace.profile);
    raw.push(parse);
    scriptTime += parse.scriptTime;
    totalTime += parse.totalTime;
    gc += parse.gc;
    metrics.push(result.metrics);

    fs.writeFileSync(
      `./traces/${scenario}_${framework}.json`,
      JSON.stringify(result.trace.profile)
    );
  }

  return {
    raw,
    gc: Math.round(gc / repetitions),
    scriptTime: Math.round(scriptTime / repetitions),
    totalTime: Math.round(totalTime / repetitions),
    metrics: parser.parseMetrics(metrics),
  };
};
