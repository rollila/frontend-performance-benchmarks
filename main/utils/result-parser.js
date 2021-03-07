export const parseProfile = (profile) => {
  const { nodes, samples, timeDeltas } = profile;
  let times = {
    scriptTime: 0,
    totalTime: 0,
    gc: 0,
  };

  samples.forEach((sample, i) => {
    if (i === 0) {
      return;
    }
    times.totalTime += timeDeltas[i];
    const node = nodes.find((node) => node.id === sample);

    if (
      node.callFrame.url !== "" ||
      nodes.some(
        (n) =>
          n.callFrame.url !== "" &&
          n.children != null &&
          n.children.includes(sample)
      )
    ) {
      times.scriptTime += timeDeltas[i];
      return;
    }

    if (node.callFrame.functionName === "(garbage collector)") {
      times.gc += timeDeltas[i];
      times.scriptTime += timeDeltas[i];
      return;
    }

    times[node.callFrame.functionName] =
      times[node.callFrame.functionName] == null
        ? timeDeltas[i]
        : times[node.callFrame.functionName] + timeDeltas[i];
  });

  return {
    ...times,
    totalTimeOld: profile.endTime - profile.startTime,
  };
};

export const parseMetrics = (metrics) => {
  return metrics
    .map((metricContainer) =>
      metricContainer.metrics.filter((item) =>
        [
          "JSEventListeners",
          "Nodes",
          "LayoutCount",
          "RecalcStyleCount",
          "LayoutDuration",
          "RecalcStyleDuration",
          "ScriptDuration",
          "TaskDuration",
          "TaskOtherDuration",
          "ThreadTime",
          "JSHeapUsedSize",
          "JSHeapTotalSize",
        ].includes(item.name)
      )
    )
    .reduce((acc, metricContainer, i) => {
      if (acc[i] == null) {
        acc = metricContainer;
        return acc;
      }
      metricContainer.forEach((item, i) => {
        const target = acc.find((metric) => metric.name === item.name);
        target.value = (target.value * i) / (i + 1) + item.value / (i + 1);
      });
      return acc;
    }, []);
};
