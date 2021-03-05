import React from "react";

import Child from "./Child.js";

export default class Scenario4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numChildren: 0,
      children: [],
    };
  }

  generate() {
    this.setState({
      children: new Array(this.state.numChildren)
        .fill(null)
        .map((_, i) => ({ id: i, value: i })),
    });
  }

  update() {
    this.setState({
      children: this.state.children.map((child) => ({
        ...child,
        value: (child.value += 1),
      })),
    });
  }

  updateSingle() {
    const i = Math.floor(
      Math.random() * Math.floor(this.state.children.length)
    );
    this.state.children[i].value += 1;
    this.setState({
      children: this.state.children,
    });
  }

  onChange(event) {
    this.setState({
      numChildren: parseInt(event.target.value, 10),
    });
  }

  render() {
    return (
      <div>
        <div>
          <label>Number of components</label>
          <input
            id="input-components"
            type="number"
            min="1"
            onChange={(event) => this.onChange(event)}
          />
          <button id="btn-generate" onClick={() => this.generate()}>
            Generate
          </button>
          <button id="btn-update" onClick={() => this.update()}>
            Update children
          </button>
          <button id="btn-update-single" onClick={() => this.updateSingle()}>
            Update single child
          </button>
        </div>
        {this.state.children.map((child) => (
          <Child key={child.id} value={child.value} />
        ))}
      </div>
    );
  }
}
