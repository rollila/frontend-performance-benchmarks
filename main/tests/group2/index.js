import * as browser from "../../utils/browser.js";
import { runTest } from "../../utils/tests.js";
import { TEST_SCENARIOS } from "../../index.js";

import * as handlers from "./handlers.js";

let NUM_REPETITIONS;
let handler;
let url;

const runOne = async (numRows, numCols) => {
  const result = await runTest({
    url,
    numRepetitions: NUM_REPETITIONS,
    handler: handler(numRows, numCols),
    testGroupNr: 2,
  });

  return {
    rows: Math.max(numRows, 1),
    cols: Math.max(numCols, 1),
    ...result,
  };
};

const runTestSet = async () => {
  const results = [];
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

export default async (testScenario, pageUrl, repetitions) => {
  NUM_REPETITIONS = repetitions;
  url = pageUrl;

  switch (testScenario) {
    case TEST_SCENARIOS.GROUP2_UPDATE_PARENT:
      handler = handlers.updateParent;
      return runTestSet();
    case TEST_SCENARIOS.GROUP2_UPDATE_CHILD:
      handler = handlers.updateChild;
      return runTestSet();
    case TEST_SCENARIOS.GROUP2_UPDATE_ALL:
      handler = handlers.updateAllChildren;
      return runTestSet();
    default:
      console.error(`Invalid handler for scenario ${testScenario}`);
      return null;
  }
};
