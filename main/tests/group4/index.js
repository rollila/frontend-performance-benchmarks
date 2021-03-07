import * as browser from "../../utils/browser.js";
import { runTest } from "../../utils/tests.js";
import testScenarios from "../../test-scenarios.js";

import * as handlers from "./handlers.js";

const runTestSet = async (handler, config) => {
  const results = [];

  const runOne = async (numComponents) => {
    const result = await runTest(handler(numComponents), config);

    results.push({
      numCreated: Math.max(numComponents, 1),
      ...result,
    });
  };

  const process = await browser.spawn();

  for (let i = 0; i <= 900; i += 100) {
    await runOne(i);
  }
  for (let i = 1000; i <= 10000; i += 1000) {
    await runOne(i);
  }

  await browser.close(process);

  return results;
};

export default async (config) => {
  switch (config.scenario) {
    case testScenarios.GROUP4_UPDATE_ALL:
      return runTestSet(handlers.updateAll, config);
    case testScenarios.GROUP4_UPDATE_SINGLE:
      return runTestSet(handlers.updateOne, config);
    default:
      throw new Error(`Invalid handler for scenario ${config.scenario}`);
  }
};
