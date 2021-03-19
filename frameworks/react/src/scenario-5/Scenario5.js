import React from "react";

import Node from "./Node.js";

export default class Scenario5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branchingFactor: 0,
      treeDepth: 0,
      initialized: false,
      count: 0,
      prop: 0,
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

  updateTree() {
    this.setState({
      prop: this.state.prop + 1,
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
        <button id="btn-update-tree" onClick={() => this.updateTree()}>
          Update entire tree
        </button>
        {this.state.initialized
          ? [...Array(this.state.branchingFactor)].map((_, i) => (
              <div>
                <Node
                  key={i}
                  branchingFactor={this.state.branchingFactor}
                  subtreeDepth={this.state.treeDepth - 1}
                  prop={this.state.prop}
                />
              </div>
            ))
          : null}
      </div>
    );
  }
}
