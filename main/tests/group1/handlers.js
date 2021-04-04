import * as fs from "fs";

import * as page from "../../utils/page.js";

export const createComponents = (numComponents) => async (
  client,
  rootNodeId
) => {
  const { DOM, Memory, Performance, Profiler } = client;

  await page.setValue(client)("#input-num-to-create", numComponents);

  await Performance.enable();
  await Profiler.start();
  await Memory.startSampling();

  await page.click(client)("#btn-generate-components");

  await DOM.querySelector({
    nodeId: rootNodeId,
    selector: "#input-num-to-create",
  });

  const metrics = await Performance.getMetrics();
  await Performance.disable();
  const trace = await Profiler.stop();
  const memProfile = await Memory.getSamplingProfile();
  await Memory.stopSampling();
  fs.writeFileSync("./memtest.json", JSON.stringify(memProfile));
  await Profiler.disable();

  return { metrics, trace };
};

export const createElements = (numElements) => async (client, rootNodeId) => {
  const { DOM, Performance, Profiler } = client;

  await page.setValue(client)("#input-num-to-create", numElements);

  await Performance.enable();
  await Profiler.start();

  await page.click(client)("#btn-generate-elements");

  await DOM.querySelector({
    nodeId: rootNodeId,
    selector: "#input-num-to-create",
  });

  const metrics = await Performance.getMetrics();
  await Performance.disable();
  const trace = await Profiler.stop();
  await Profiler.disable();

  return { metrics, trace };
};

export const deleteComponents = (numComponents) => async (
  client,
  rootNodeId
) => {
  const { DOM, Performance, Profiler } = client;

  await page.setValue(client)("#input-num-to-create", numComponents);
  await page.click(client)("#btn-generate-components");

  await Performance.enable();
  await Profiler.start();

  await page.click(client)("#btn-delete");

  await DOM.querySelector({
    nodeId: rootNodeId,
    selector: "#input-num-to-create",
  });

  const metrics = await Performance.getMetrics();
  await Performance.disable();
  const trace = await Profiler.stop();
  await Profiler.disable();

  return { metrics, trace };
};

export const addOneComponent = (numComponents) => async (
  client,
  rootNodeId
) => {
  const { DOM, Performance, Profiler } = client;

  await page.setValue(client)("#input-num-to-create", numComponents);
  await page.click(client)("#btn-generate-components");

  await Performance.enable();
  await Profiler.start();

  await page.click(client)("#btn-add-one");

  await DOM.querySelector({
    nodeId: rootNodeId,
    selector: "#input-num-to-create",
  });

  const metrics = await Performance.getMetrics();
  await Performance.disable();
  const trace = await Profiler.stop();
  await Profiler.disable();

  return { metrics, trace };
};

export const changeComponentType = (numComponents) => async (
  client,
  rootNodeId
) => {
  const { DOM, Performance, Profiler } = client;

  await page.setValue(client)("#input-num-to-create", numComponents);

  await page.click(client)("#btn-generate-components");

  await Performance.enable();
  await Profiler.start();

  await page.click(client)("#btn-switch-child-type");

  await DOM.querySelector({
    nodeId: rootNodeId,
    selector: "#input-num-to-create",
  });

  const metrics = await Performance.getMetrics();
  await Performance.disable();
  const trace = await Profiler.stop();
  await Profiler.disable();

  return { metrics, trace };
};
