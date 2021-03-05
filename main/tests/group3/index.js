import * as browser from "../../utils/browser.js";
import { runTest } from "../../utils/tests.js";
import { TEST_SCENARIOS } from "../../index.js";

import * as handlers from "./handlers.js";

let NUM_REPETITIONS;
let handler;
let url;

const runOne = async (branchingFactor, treeDepth) => {
  const result = await runTest({
    url,
    numRepetitions: NUM_REPETITIONS,
    handler: handler(branchingFactor, treeDepth),
    testGroupNr: 3,
  });

  return {
    branchingFactor,
    treeDepth,
    numComponents: Math.pow(branchingFactor, treeDepth),
    ...result,
  };
};

const runTestSet = async (branchingFactor) => {
  const results = [];
  const process = await browser.spawn();

  for (let i = 1; Math.pow(branchingFactor, i) <= 66000; i += 1) {
    results.push(await runOne(branchingFactor, i));
  }

  await browser.close(process);
  return results;
};

export default async (testScenario, pageUrl, repetitions) => {
  NUM_REPETITIONS = repetitions;
  url = pageUrl;

  switch (testScenario) {
    case TEST_SCENARIOS.GROUP3_UPDATE_LEAF:
      handler = handlers.updateLeaf;
      return runTestSet(2);
    case TEST_SCENARIOS.GROUP3_UPDATE_ROOT:
      handler = handlers.updateRoot;
      return runTestSet(2);
    default:
      console.error(`Invalid handler for scenario ${testScenario}`);
      return null;
  }
};
