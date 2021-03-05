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
      testGroupNr: 1,
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
  for (let i = 1000; i <= 9000; i += 1000) {
    await runOne(i);
  }
  for (let i = 10000; i <= 50000; i += 5000) {
    await runOne(i);
  }
  await browser.close(process);

  return results;
};

export default async (testScenario, url, repetitions) => {
  NUM_REPETITIONS = repetitions;
  switch (testScenario) {
    case TEST_SCENARIOS.GROUP1_CREATE_COMPONENTS:
      return runTestSet(url, handlers.createComponents);
    case TEST_SCENARIOS.GROUP1_DELETE_COMPONENTS:
      return runTestSet(url, handlers.deleteComponents);
    case TEST_SCENARIOS.GROUP1_ADD_ONE_COMPONENT:
      return runTestSet(url, handlers.addOneComponent);
    case TEST_SCENARIOS.GROUP1_CREATE_ELEMENTS:
      return runTestSet(url, handlers.createElements);
    case TEST_SCENARIOS.GROUP1_CHANGE_COMPONENT_TYPE:
      return runTestSet(url, handlers.changeComponentType);
    default:
      console.error(`Invalid handler for scenario ${testScenario}`);
      return null;
  }
};
