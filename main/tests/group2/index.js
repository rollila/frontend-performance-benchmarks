import * as browser from "../../utils/browser.js";
import { runTest } from "../../utils/tests.js";
import testScenarios from "../../test-scenarios.js";

import * as handlers from "./handlers.js";

const runTestSet = async (handler, config) => {
  const results = [];

  const runOne = async (numRows, numCols) => {
    const result = await runTest(handler(numRows, numCols), config);

    return {
      rows: Math.max(numRows, 1),
      cols: Math.max(numCols, 1),
      ...result,
    };
  };

  for (let i = 0; i <= 900; i += 100) {
    const process = await browser.spawn();
    results.push(await runOne(1, i));
    await browser.close(process);
  }
  for (let i = 1000; i <= 9000; i += 1000) {
    const process = await browser.spawn();
    results.push(await runOne(1, i));
    await browser.close(process);
  }
  for (let i = 10000; i <= 50000; i += 5000) {
    const process = await browser.spawn();
    results.push(await runOne(1, i));
    await browser.close(process);
  }

  return results;
};

export default async (config) => {
  switch (config.scenario) {
    case testScenarios.GROUP2_UPDATE_PARENT:
      return runTestSet(handlers.updateParent, config);
    case testScenarios.GROUP2_UPDATE_CHILD:
      return runTestSet(handlers.updateChild, config);
    case testScenarios.GROUP2_UPDATE_ALL:
      return runTestSet(handlers.updateAllChildren, config);
    default:
      throw new Error(`Invalid handler for scenario ${config.scenario}`);
  }
};
