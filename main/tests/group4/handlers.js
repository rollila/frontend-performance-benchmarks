import * as page from "../../utils/page.js";

export const updateAll = (numComponents) => async (client, rootNodeId) => {
  const { DOM, Performance, Profiler } = client;

  await page.setValue(client)("#input-components", numComponents);

  await page.click(client)("#btn-generate");

  await Performance.enable();
  await Profiler.start();

  await page.click(client)("#btn-update");

  await DOM.querySelector({
    nodeId: rootNodeId,
    selector: "#input-components",
  });

  const metrics = await Performance.getMetrics();
  await Performance.disable();
  const trace = await Profiler.stop();
  await Profiler.disable();

  return { metrics, trace };
};

export const updateOne = (numComponents) => async (client, rootNodeId) => {
  const { DOM, Performance, Profiler } = client;

  await page.setValue(client)("#input-components", numComponents);

  await page.click(client)("#btn-generate");

  await Performance.enable();
  await Profiler.start();

  await page.click(client)("#btn-update-single");

  await DOM.querySelector({
    nodeId: rootNodeId,
    selector: "#input-components",
  });

  const metrics = await Performance.getMetrics();
  await Performance.disable();
  const trace = await Profiler.stop();
  await Profiler.disable();

  return { metrics, trace };
};
