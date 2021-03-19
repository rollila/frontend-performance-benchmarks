import fs from "fs";

const frameworks = fs.readdirSync("./results");
const scenarios = fs.readdirSync(`./results/${frameworks[0]}`);

const scenarioResults = scenarios.map((scenario) => {
  return {
    scenarioName: scenario,
    scenarioGroup: scenario.split("_")[0],
    results: frameworks.map((framework) => ({
      framework,
      path: `./results/${framework}/${scenario}`,
    })),
  };
});

scenarioResults.forEach((scenario) => {
  const times = [];
  const group = scenario.scenarioGroup;

  let header = `Name,`;
  const headerPath = `./results/angular/${scenario.scenarioName}`;
  const headerData = JSON.parse(fs.readFileSync(headerPath));

  if (group === "group1" || group === "group4") {
    header = header.concat(headerData.map((item) => item.numCreated).join(","));
    times.push(header);
  }

  if (group === "group2") {
    header = header.concat(
      headerData.map((item) => Math.max(item.rows, item.cols)).join(",")
    );
    times.push(header);
  }

  if (group === "group3" || group === "group5") {
    header = header.concat(
      headerData.map((item) => item.numComponents).join(",")
    );
    times.push(header);
  }

  scenario.results.forEach((result) => {
    if (!fs.existsSync(result.path)) {
      return;
    }
    const data = JSON.parse(fs.readFileSync(result.path));
    const scriptTime = data
      .map((item) => Math.round(item.scriptTime / 1000))
      .join(",");
    times.push(`${result.framework}_script, ${scriptTime}`);

    const totalTime = data
      .map((item) => Math.round(item.totalTime / 1000))
      .join(",");
    times.push(`${result.framework}_total, ${totalTime}`);
  });
  fs.writeFileSync(
    `./results/csv/${scenario.scenarioName.split(".")[0]}.csv`,
    times.join("\r\n")
  );
});
