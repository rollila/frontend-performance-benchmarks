import * as browser from "../../utils/browser.js";
import { runTest } from "../../utils/tests.js";
import { TEST_SCENARIOS } from "../../index.js";

import * as handlers from "./handlers.js";

let NUM_REPETITIONS;

const runTestSet = async (url, handler) => {
  const results = [];

  const runOne = async (numComponents) => {
    const result = await runTest({
      url,
      numRepetitions: NUM_REPETITIONS,
      handler: handler(numComponents),
      testGroupNr: 4,
    });

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

export default async (testScenario, url, repetitions) => {
  NUM_REPETITIONS = repetitions;

  switch (testScenario) {
    case TEST_SCENARIOS.GROUP4_UPDATE_ALL:
      return runTestSet(url, handlers.updateAll);
    case TEST_SCENARIOS.GROUP4_UPDATE_SINGLE:
      return runTestSet(url, handlers.updateOne);
    default:
      console.error(`Invalid handler for scenario ${testScenario}`);
      return null;
  }
};
