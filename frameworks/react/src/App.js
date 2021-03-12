import React from "react";

import Scenario1 from "./scenario-1/Scenario1.js";
import Scenario2 from "./scenario-2/Scenario2.js";
import Scenario3 from "./scenario-3/Scenario3.js";
import Scenario4 from "./scenario-4/Scenario4.js";
import Scenario5 from "./scenario-5/Scenario5.js";
import Scenario6 from "./scenario-6/Scenario6.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scenarioComponent: null,
    };
  }

  selectScenario(value) {
    this.setState({
      scenarioComponent:
        value === 1
          ? Scenario1
          : value === 2
          ? Scenario2
          : value === 3
          ? Scenario3
          : value === 4
          ? Scenario4
          : value === 5
          ? Scenario5
          : value === 6
          ? Scenario6
          : null,
    });
  }

  render() {
    const Tag = this.state.scenarioComponent;
    return (
      <div>
        {this.state.scenarioComponent == null ? (
          <div>
            <h4>Select scenario</h4>
            <div>
              <div>
                <label>Scenario 1: Generate and delete components</label>
                <button id="btn-scen-1" onClick={() => this.selectScenario(1)}>
                  Select
                </button>
              </div>
              <div>
                <label>
                  Scenario 2: Update components in a flat DOM tree
                  <button
                    id="btn-scen-2"
                    onClick={() => this.selectScenario(2)}
                  >
                    Select
                  </button>
                </label>
              </div>
              <div>
                <label>
                  Scenario 3: Update components in a deep DOM tree
                  <button
                    id="btn-scen-3"
                    onClick={() => this.selectScenario(3)}
                  >
                    Select
                  </button>
                </label>
              </div>
              <div>
                <label>
                  Scenario 4: Update components containing mostly static content
                </label>
                <button id="btn-scen-4" onClick={() => this.selectScenario(4)}>
                  Select
                </button>
              </div>
              <div>
                <label>Scenario 5</label>
                <button id="btn-scen-5" onClick={() => this.selectScenario(5)}>
                  Select
                </button>
              </div>
              <div>
                <label>Scenario 6</label>
                <button id="btn-scen-6" onClick={() => this.selectScenario(6)}>
                  Select
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Tag />
        )}
      </div>
    );
  }
}

export default App;
