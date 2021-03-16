import fs from "fs";

import group1 from "./tests/group1/index.js";
import group2 from "./tests/group2/index.js";
import group3 from "./tests/group3/index.js";
import group4 from "./tests/group4/index.js";
import group5 from "./tests/group5/index.js";
import config from "./utils/config.js";

const main = async () => {
  const group = config.scenario.split("_")[0];
  const resultsPath = `./results/${config.framework}`;

  const results = await (async () => {
    switch (group) {
      case "group1":
        return await group1(config);
      case "group2":
        return await group2(config);
      case "group3":
        return await group3(config);
      case "group4":
        return await group4(config);
      case "group5":
        return await group5(config);
    }
  })();

  fs.writeFileSync(
    `${resultsPath}/${config.scenario}.json`,
    JSON.stringify(results)
  );
};

main();
