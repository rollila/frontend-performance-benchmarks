<script>
  import { tick } from "svelte";

  import Chart from "./Chart.svelte";
  import RangePicker from "./RangePicker.svelte";
  import ScenarioPicker from "./ScenarioPicker.svelte";

  let scenarioData = {};
  let scenario;
  let loading = true;
  let rangeStart;
  let rangeEnd;
  let labels;

  $: filteredScenarioData =
    rangeStart != null && rangeEnd != null
      ? Object.keys(scenarioData).reduce((acc, framework) => {
          acc[framework] = scenarioData[framework].slice(
            rangeStart,
            rangeEnd + 1
          );
          return acc;
        }, {})
      : scenarioData;

  $: filteredLabels =
    rangeStart != null && rangeEnd != null
      ? labels.slice(rangeStart, rangeEnd + 1)
      : labels;

  $: scenarioDescription = () => {
    switch (scenario) {
      case "group1_add_one":
        return "In this scenario, a parent component has N child components. The time taken to add one more child is measured.";
      case "group1_create_components":
        return "In this scenario, the time taken to add N child components to a single parent is measured.";
      case "group1_create_elements":
        return "In this scenario, the time taken to render N static <div> elements within a single component is measured.";
      case "group1_delete_components":
        return "In this scenario, a single parent contains N child components. The time taken to remove all the children is measured.";
      case "group1_change_component_type":
        return "In this scenario, a single parent contains N child components. The time taken to change all the components to a different component is measured.";
      case "group2_update_all":
        return "In this scenario, a parent component contains N child components. Each of the child components accepts a prop which is rendered within a <div> element. The value of the prop is changed and the time taken to update all the children is measured.";
      case "group2_update_child":
        return "In this scenario, a parent component contains N child components. Each of the child components contains a button which can be used to increment a displayed value bound to the child. The time taken to update a single child is measured.";
      case "group2_update_parent":
        return "In this scenario, a parent component contains N child components. The parent component contains a button which can be used to increment a displayed value bound to the parent. The button is pressed and the time taken to update the parent is measured. No child components are changed.";
      case "group3_create_tree":
        return "In this scenario, we measure the time taken to create a component tree with a branching factor of 2.";
      case "group3_update_leaf":
        return "In this scenario, there is a component tree with a branching factor of 2. Each leaf of the tree contains a button that can be pressed to increment a value bound to the leaf node. The button of one leaf is pressed and the time taken to update the leaf is measured.";
      case "group3_update_root":
        return "In this scenario, there is a component tree with a branching factor of 2. The root node contains a button that can be pressed to increment a value bound to the root, which is pressed and the time taken to update the root is measured. Child components are unchanged.";
      case "group4_update_all":
        return "In this scenario, a parent component contains N child components, each of which renders 100 static elements that remain unchanged between renders, in addition to rendering a single prop value. The prop value is updated for all children, and the time taken to update all the children is measured.";
      case "group4_update_single":
        return "In this scenario, a parent component contains N child components, each of which renders 100 static elements that remain unchanged between renders, in addition to rendering a single prop value. The prop value is updated for a single child, and the time taken to update the child is measured.";
      default:
        return "";
    }
  };

  async function onChange(event) {
    loading = true;
    rangeStart = null;
    rangeEnd = null;

    await tick();
    const data = event.detail.data;
    labels = Object.keys(data[0]).filter((label) => label !== "Name");
    scenario = event.detail.scenario;

    scenarioData = data.reduce((acc, item) => {
      acc[item.Name] = Object.values(item);
      return acc;
    }, {});

    loading = false;
  }

  async function onSelectRange(event) {
    loading = true;
    await tick();
    rangeStart = event.detail.start;
    rangeEnd = event.detail.end;
    loading = false;
  }
</script>

<main>
  <div>
    <div class="options">
      <ScenarioPicker
        on:change={(event) => onChange(event)}
        class="scenario-picker"
      />
      {#if scenario}
        <RangePicker
          {labels}
          {scenario}
          on:change={(event) => onSelectRange(event)}
        />
      {/if}
    </div>

    {#if scenario}
      <div class="scenario-description">
        <h4>Scenario description</h4>
        <p>{scenarioDescription()}</p>
      </div>
    {/if}
    {#if !loading && filteredLabels}
      <div class="chart-wrapper">
        <Chart
          labels={filteredLabels}
          angular={filteredScenarioData.angular_script}
          blazor={filteredScenarioData.blazor_script}
          react={filteredScenarioData.react_script}
          vue={filteredScenarioData.vue_script}
          vue3={filteredScenarioData.vue3_script}
          svelte={filteredScenarioData.svelte_script}
          id="canvas-scripts"
          title="Time taken to execute scripts (ms)"
        />
      </div>
      <div class="chart-wrapper">
        <Chart
          labels={filteredLabels}
          angular={filteredScenarioData.angular_total}
          blazor={filteredScenarioData.blazor_total}
          react={filteredScenarioData.react_total}
          vue={filteredScenarioData.vue_total}
          vue3={filteredScenarioData.vue3_total}
          svelte={filteredScenarioData.svelte_total}
          id="canvas-total"
          title="Total time to render(ms)"
        />
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    max-width: 1400px;
  }
  .chart-wrapper {
    margin: 25px 0;
    max-width: 1400px;
  }

  .scenario-description {
    margin: 25px 0 50px;
  }

  .options {
    display: flex;
  }

  :global(.scenario-picker) {
    margin-right: 25px;
  }
</style>
