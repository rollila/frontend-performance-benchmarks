import React from "react";

import Node from "./Node.js";

export default class Scenario6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branchingFactor: 0,
      treeDepth: 0,
      initialized: false,
      count: 0,
      items: Array(10)
        .fill(null)
        .map(() => ({
          value0: 0,
          value1: 1,
          value2: 2,
          value3: 3,
          value4: 4,
          value5: 5,
          value6: 6,
          value7: 7,
          value8: 8,
          value9: 9,
        })),
    };
  }

  onUpdateBranchingFactor(event) {
    this.setState({
      branchingFactor: parseInt(event.target.value, 10),
    });
  }

  onUpdateTreeDepth(event) {
    this.setState({
      treeDepth: parseInt(event.target.value, 10),
    });
  }

  generate() {
    this.setState({
      initialized: true,
    });
  }

  increment() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <div>
        <label>Select branching factor</label>
        <input
          id="input-branching-factor"
          type="number"
          onChange={(event) => this.onUpdateBranchingFactor(event)}
        />
        <label>Select tree depth</label>
        <input
          id="input-tree-depth"
          type="number"
          onChange={(event) => this.onUpdateTreeDepth(event)}
        />
        <button id="btn-generate" onClick={() => this.generate()}>
          Generate tree
        </button>
        <div>{this.state.count}</div>
        <button id="btn-increment-root" onClick={() => this.increment()}>
          Update root
        </button>
        <div>
          {this.state.initialized
            ? [...Array(this.state.branchingFactor)].map((_, i) => (
                <Node
                  key={i}
                  branchingFactor={this.state.branchingFactor}
                  subtreeDepth={this.state.treeDepth - 1}
                  items={this.state.items}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}
