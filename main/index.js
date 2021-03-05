import fs from "fs";
import cmdLineArgs from "command-line-args";

import group1 from "./tests/group1/index.js";
import group2 from "./tests/group2/index.js";
import group3 from "./tests/group3/index.js";
import group4 from "./tests/group4/index.js";
import frameworks from "./frameworks.js";

const argsDefinitions = [
  {
    name: "framework",
    alias: "f",
    type: String,
  },
  {
    name: "scenario",
    alias: "s",
    type: String,
  },
  {
    name: "repetitions",
    alias: "r",
    type: String,
  },
];

export const TEST_SCENARIOS = {
  GROUP1_CREATE_COMPONENTS: "group1_create_components",
  GROUP1_CREATE_ELEMENTS: "group1_create_elements",
  GROUP1_DELETE_COMPONENTS: "group1_delete_components",
  GROUP1_ADD_ONE_COMPONENT: "group1_add_one",
  GROUP1_CHANGE_COMPONENT_TYPE: "group1_change_component_type",
  GROUP2_UPDATE_PARENT: "group2_update_parent",
  GROUP2_UPDATE_CHILD: "group2_update_child",
  GROUP2_UPDATE_ALL: "group2_update_all",
  GROUP3_UPDATE_LEAF: "group3_update_leaf",
  GROUP3_UPDATE_ROOT: "group3_update_root",
  GROUP4_UPDATE_SINGLE: "group4_update_single",
  GROUP4_UPDATE_ALL: "group4_update_all",
};

const main = async () => {
  const options = cmdLineArgs(argsDefinitions);
  const framework = frameworks.find((fw) => fw.name === options.framework);
  if (framework == null) {
    console.error("Invalid or missing framework");
    return;
  }

  const url = `http://localhost:${framework.port}`;
  const resultsPath = `./results/${framework.name}`;

  const testScenario = options.scenario;
  if (
    testScenario == null ||
    !Object.values(TEST_SCENARIOS).includes(testScenario)
  ) {
    console.error("Invalid or missing test scenario");
    return;
  }

  const reps =
    options.repetitions != null ? parseInt(options.repetitions, 10) : 1;

  let results;

  if (testScenario.startsWith("group1")) {
    results = await group1(testScenario, url, reps);
  }

  if (testScenario.startsWith("group2")) {
    results = await group2(testScenario, url, reps);
  }

  if (testScenario.startsWith("group3")) {
    results = await group3(testScenario, url, reps);
  }

  if (testScenario.startsWith("group4")) {
    results = await group4(testScenario, url, reps);
  }

  fs.writeFileSync(
    `${resultsPath}/${testScenario}.json`,
    JSON.stringify(results)
  );
};

main();
