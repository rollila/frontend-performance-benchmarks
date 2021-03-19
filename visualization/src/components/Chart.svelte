<script>
  import { Chart } from "chart.js";
  import { onMount } from "svelte";

  export let angular;
  export let blazor;
  export let react;
  export let svelte;
  export let vue;
  export let vue3;
  export let labels;
  export let id;
  export let title;

  let chart;

  $: datasets = [
    {
      id: "angular",
      label: "Angular",
      fill: false,
      borderColor: "#EAC756",
      data: angular,
      lineTension: 0,
    },
    {
      id: "blazor",
      label: "Blazor",
      fill: false,
      borderColor: "#88D37D",
      data: blazor,
      lineTension: 0,
    },
    {
      id: "react",
      label: "React",
      fill: false,
      borderColor: "#3FCCC3",
      data: react,
      lineTension: 0,
    },
    /* 
    {
      id: "vue",
      label: "Vue 2",
      fill: false,
      borderColor: "#91B1E0",
      data: vue,
      lineTension: 0,
    }, */
    {
      id: "vue3",
      label: "Vue",
      fill: false,
      borderColor: "#E18DB7",
      data: vue3,
      lineTension: 0,
    },
    {
      id: "svelte",
      label: "Svelte",
      fill: false,
      borderColor: "#EA806E",
      data: svelte,
      lineTension: 0,
    },
  ];

  $: () => {
    if (angular) {
      renderChart();
    }
  };

  function renderChart() {
    const canvas = document.getElementById(id);

    chart = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets,
      },
      options: {
        layout: {
          left: 25,
          top: 12,
          right: 25,
          bottom: 25,
        },
        title: {
          display: true,
          text: title,
        },
        legend: {
          labels: {
            fontSize: 16,
            fontStyle: "bold",
          },
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Time (ms)",
                fontSize: 16,
                fontStyle: "bold",
              },
              ticks: {
                fontSize: 16,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Number of components",
                fontSize: 16,
                fontStyle: "bold",
              },
              ticks: {
                fontSize: 16,
              },
            },
          ],
        },
      },
    });
  }

  onMount(() => {
    renderChart();
  });
</script>

<div>
  <canvas {id} />
</div>
