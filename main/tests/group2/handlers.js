import * as page from "../../utils/page.js";

export const updateParent = (numRows, numCols) => async (
  client,
  rootNodeId
) => {
  const { DOM, Performance, Profiler } = client;

  await page.setValue(client)("#input-rows", numRows);
  await page.setValue(client)("#input-columns", numCols);

  await page.click(client)("#btn-generate");

  await Performance.enable();
  await Profiler.start();

  await page.click(client)(".row-btn-update-self");

  await DOM.querySelector({
    nodeId: rootNodeId,
    selector: "#input-rows",
  });

  const metrics = await Performance.getMetrics();
  await Performance.disable();
  const trace = await Profiler.stop();
  await Profiler.disable();

  return { metrics, trace };
};

export const updateChild = (numRows, numCols) => async (client, rootNodeId) => {
  const { DOM, Performance, Profiler } = client;

  await page.setValue(client)("#input-rows", numRows);
  await page.setValue(client)("#input-columns", numCols);

  await page.click(client)("#btn-generate");

  await Performance.enable();
  await Profiler.start();

  await page.click(client)(".cell-btn-increment");

  await DOM.querySelector({
    nodeId: rootNodeId,
    selector: "#input-rows",
  });

  const metrics = await Performance.getMetrics();
  await Performance.disable();
  const trace = await Profiler.stop();
  await Profiler.disable();

  return { metrics, trace };
};

export const updateAllChildren = (numRows, numCols) => async (
  client,
  rootNodeId
) => {
  const { DOM, Performance, Profiler } = client;

  await page.setValue(client)("#input-rows", numRows);
  await page.setValue(client)("#input-columns", numCols);

  await page.click(client)("#btn-generate");

  await Performance.enable();
  await Profiler.start();

  await page.click(client)(".row-btn-update-children");

  await DOM.querySelector({
    nodeId: rootNodeId,
    selector: "#input-rows",
  });

  const metrics = await Performance.getMetrics();
  await Performance.disable();
  const trace = await Profiler.stop();
  await Profiler.disable();

  return { metrics, trace };
};
