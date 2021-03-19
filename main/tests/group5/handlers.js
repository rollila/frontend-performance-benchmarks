import * as page from "../../utils/page.js";

export const updateLeaf = (branchingFactor, treeDepth) => async (
  client,
  rootNodeId
) => {
  const { DOM, Performance, Profiler } = client;

  await page.setValue(client)("#input-branching-factor", branchingFactor);
  await page.setValue(client)("#input-tree-depth", treeDepth);

  await page.click(client)("#btn-generate");

  await Performance.enable();
  await Profiler.start();

  await page.clickLast(client)(".btn-increment-node");

  await DOM.querySelector({
    nodeId: rootNodeId,
    selector: "#input-branching-factor",
  });

  const metrics = await Performance.getMetrics();
  await Performance.disable();
  const trace = await Profiler.stop();
  await Profiler.disable();

  return { metrics, trace };
};

export const updateRoot = (branchingFactor, treeDepth) => async (
  client,
  rootNodeId
) => {
  const { DOM, Performance, Profiler } = client;

  await page.setValue(client)("#input-branching-factor", branchingFactor);
  await page.setValue(client)("#input-tree-depth", treeDepth);

  await page.click(client)("#btn-generate");

  await Performance.enable();
  await Profiler.start();

  await page.click(client)("#btn-increment-root");

  await DOM.querySelector({
    nodeId: rootNodeId,
    selector: "#input-branching-factor",
  });

  const metrics = await Performance.getMetrics();
  await Performance.disable();
  const trace = await Profiler.stop();
  await Profiler.disable();

  return { metrics, trace };
};

export const updateAll = (branchingFactor, treeDepth) => async (
  client,
  rootNodeId
) => {
  const { DOM, Performance, Profiler } = client;

  await page.setValue(client)("#input-branching-factor", branchingFactor);
  await page.setValue(client)("#input-tree-depth", treeDepth);

  await page.click(client)("#btn-generate");

  await Performance.enable();
  await Profiler.start();

  await page.click(client)("#btn-update-tree");

  await DOM.querySelector({
    nodeId: rootNodeId,
    selector: "#input-branching-factor",
  });

  const metrics = await Performance.getMetrics();
  await Performance.disable();
  const trace = await Profiler.stop();
  await Profiler.disable();

  return { metrics, trace };
};

export const createTree = (branchingFactor, treeDepth) => async (
  client,
  rootNodeId
) => {
  const { DOM, Performance, Profiler } = client;

  await page.setValue(client)("#input-branching-factor", branchingFactor);
  await page.setValue(client)("#input-tree-depth", treeDepth);

  await Performance.enable();
  await Profiler.start();

  await page.click(client)("#btn-generate");

  await DOM.querySelector({
    nodeId: rootNodeId,
    selector: "#input-branching-factor",
  });

  const metrics = await Performance.getMetrics();
  await Performance.disable();
  const trace = await Profiler.stop();
  await Profiler.disable();

  return { metrics, trace };
};
