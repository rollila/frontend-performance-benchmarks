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
  for (let i = 1000; i <= 9000; i += 1000) {
    await runOne(i);
  }
  for (let i = 10000; i <= 50000; i += 5000) {
    await runOne(i);
  }
  await browser.close(process);

  return results;
};

export default async (config) => {
  switch (config.scenario) {
    case testScenarios.GROUP1_CREATE_COMPONENTS:
      return runTestSet(handlers.createComponents, config);
    case testScenarios.GROUP1_DELETE_COMPONENTS:
      return runTestSet(handlers.deleteComponents, config);
    case testScenarios.GROUP1_ADD_ONE_COMPONENT:
      return runTestSet(handlers.addOneComponent, config);
    case testScenarios.GROUP1_CREATE_ELEMENTS:
      return runTestSet(handlers.createElements, config);
    case testScenarios.GROUP1_CHANGE_COMPONENT_TYPE:
      return runTestSet(handlers.changeComponentType, config);
    default:
      throw new Error(`Invalid handler for scenario ${config.scenario}`);
  }
};
