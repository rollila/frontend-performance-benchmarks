<script>
  import Scenario1 from "./scenario-1/Scenario1.svelte";
  import Scenario2 from "./scenario-2/Scenario2.svelte";
  import Scenario3 from "./scenario-3/Scenario3.svelte";
  import Scenario4 from "./scenario-4/Scenario4.svelte";
  import Scenario5 from "./scenario-5/Scenario5.svelte";
  import Scenario6 from "./scenario-6/Scenario6.svelte";

  function selectScenario(value) {
    selectedScenario = value;
  }
  let selectedScenario = null;
  $: scenarioComponent =
    selectedScenario === 1
      ? Scenario1
      : selectedScenario === 2
      ? Scenario2
      : selectedScenario === 3
      ? Scenario3
      : selectedScenario === 4
      ? Scenario4
      : selectedScenario === 5
      ? Scenario5
      : selectedScenario === 6
      ? Scenario6
      : null;
</script>

<main>
  <div>
    {#if selectedScenario == null}
      <div>
        <h4>Select scenario</h4>
        <div>
          <div>
            <label> Scenario 1: Generate and delete components </label>
            <button id="btn-scen-1" on:click={() => selectScenario(1)}>
              Select
            </button>
          </div>
          <div>
            <label>
              Scenario 2: Update components in a flat DOM tree
              <button id="btn-scen-2" on:click={() => selectScenario(2)}>
                Select
              </button>
            </label>
          </div>
          <div>
            <label>
              Scenario 3: Update components in a branching DOM tree
              <button id="btn-scen-3" on:click={() => selectScenario(3)}>
                Select
              </button>
            </label>
          </div>
          <div>
            <label>
              Scenario 4: Update components containing mostly static content
              <button id="btn-scen-4" on:click={() => selectScenario(4)}
                >Select</button
              >
            </label>
          </div>
          <div>
            <label>
              Scenario 5
              <button id="btn-scen-5" on:click={() => selectScenario(5)}
                >Select</button
              >
            </label>
          </div>
          <div>
            <label>
              Scenario 6
              <button id="btn-scen-6" on:click={() => selectScenario(6)}
                >Select</button
              >
            </label>
          </div>
        </div>
      </div>
    {:else}
      <svelte:component this={scenarioComponent} />
    {/if}
  </div>
</main>
