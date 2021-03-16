<template>
  <div>
    <div v-if="!selectedScenario">
      <h4>Select scenario</h4>
      <div>
        <div>
          <label>Scenario 1: Generate and delete components</label>
          <button id="btn-scen-1" @click="selectScenario(1)">Select</button>
        </div>
        <div>
          <label>
            Scenario 2: Update components in a flat DOM tree
            <button id="btn-scen-2" @click="selectScenario(2)">Select</button>
          </label>
        </div>
        <div>
          <label>
            Scenario 3: Update components in a deep DOM tree
            <button id="btn-scen-3" @click="selectScenario(3)">Select</button>
          </label>
        </div>
        <div>
          <label>
            Scenario 4: Update components containing mostly static content
            <button id="btn-scen-4" @click="selectScenario(4)">Select</button>
          </label>
        </div>
        <div>
          <label>
            Scenario 5
            <button id="btn-scen-5" @click="selectScenario(5)">Select</button>
          </label>
        </div>
      </div>
    </div>
    <component v-if="selectedScenario" :is="scenarioComponent" />
  </div>
</template>

<script>
import Scenario1 from "./scenario-1/Scenario1";
import Scenario2 from "./scenario-2/Scenario2";
import Scenario3 from "./scenario-3/Scenario3";
import Scenario4 from "./scenario-4/Scenario4";
import Scenario5 from "./scenario-5/Scenario5";

export default {
  components: {
    Scenario1,
    Scenario2,
    Scenario3,
    Scenario4,
    Scenario5,
  },
  data() {
    return {
      selectedScenario: null,
    };
  },
  computed: {
    scenarioComponent() {
      switch (this.selectedScenario) {
        case 1:
          return Scenario1;
        case 2:
          return Scenario2;
        case 3:
          return Scenario3;
        case 4:
          return Scenario4;
        case 5:
          return Scenario5;
        default:
          return null;
      }
    },
  },
  methods: {
    selectScenario(number) {
      this.selectedScenario = number;
    },
  },
};
</script>
