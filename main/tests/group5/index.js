import * as browser from "../../utils/browser.js";
import { runTest } from "../../utils/tests.js";
import testScenarios from "../../test-scenarios.js";

import * as handlers from "./handlers.js";

const BRANCHING_FACTOR = 2;

const runTestSet = async (handler, config) => {
  const results = [];

  const runOne = async (treeDepth) => {
    const result = await runTest(handler(BRANCHING_FACTOR, treeDepth), config);

    return {
      BRANCHING_FACTOR,
      treeDepth,
      numComponents: Math.pow(BRANCHING_FACTOR, treeDepth),
      ...result,
    };
  };

  const process = await browser.spawn();

  for (
    let i = 1;
    Math.pow(BRANCHING_FACTOR, i) <= Math.pow(BRANCHING_FACTOR, 13);
    i += 1
  ) {
    results.push(await runOne(i));
  }

  await browser.close(process);
  return results;
};

export default async (config) => {
  switch (config.scenario) {
    case testScenarios.GROUP5_CREATE_TREE:
      return runTestSet(handlers.createTree, config);
    case testScenarios.GROUP5_UPDATE_LEAF:
      return runTestSet(handlers.updateLeaf, config);
    case testScenarios.GROUP5_UPDATE_ROOT:
      return runTestSet(handlers.updateRoot, config);
    case testScenarios.GROUP5_UPDATE_ALL:
      return runTestSet(handlers.updateAll, config);
    default:
      throw new Error(`Invalid handler for scenario ${config.scenario}`);
  }
};
