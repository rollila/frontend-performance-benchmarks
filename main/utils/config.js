import cmdLineArgs from "command-line-args";

import frameworks from "../frameworks.js";
import testScenarios from "../test-scenarios.js";

const configDefinition = [
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

export default (function () {
  const options = cmdLineArgs(configDefinition);
  const framework = frameworks.find((fw) => fw.name === options.framework);
  if (framework == null) {
    throw new Error("Invalid or missing framework");
  }

  const testScenario = options.scenario;
  if (
    testScenario == null ||
    !Object.values(testScenarios).includes(testScenario)
  ) {
    throw new Error("Invalid or missing test scenario");
  }

  return {
    ...options,
    repetitions: options.repetitions || 1,
    url: `http://localhost:${framework.port}`,
  };
})();
