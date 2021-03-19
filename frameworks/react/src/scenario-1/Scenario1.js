import React from "react";

import Child from "./Child.js";
import Child2 from "./Child2.js";

class Scenario1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numChildren: 0,
      children: [],
      elements: [],
      childType: 1,
    };
  }

  addOne() {
    this.setState({
      children: [...this.state.children, { id: this.state.children.length }],
    });
  }

  remove() {
    this.setState({
      children: [],
    });
  }

  generateComponents() {
    this.setState({
      children: new Array(this.state.numChildren)
        .fill(null)
        .map((_, i) => ({ id: i })),
    });
  }

  generateElements() {
    this.setState({
      elements: new Array(this.state.numChildren).fill(null),
    });
  }

  onUpdateValue(event) {
    this.setState({
      numChildren: parseInt(event.target.value, 10),
    });
  }

  switchType() {
    this.setState({
      childType: 2,
    });
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <label>Number of components or elements to create</label>
            <input
              id="input-num-to-create"
              type="number"
              min="1"
              onChange={(evt) => this.onUpdateValue(evt)}
            />
            <button
              id="btn-generate-components"
              onClick={() => this.generateComponents()}
            >
              Generate components
            </button>
            <button
              id="btn-generate-elements"
              onClick={() => this.generateElements()}
            >
              Generate static elements
            </button>
          </div>
          <div>
            <button id="btn-delete" onClick={() => this.remove()}>
              Delete all components
            </button>
            <button id="btn-add-one" onClick={() => this.addOne()}>
              Add one component
            </button>
            <button
              id="btn-switch-child-type"
              onClick={() => this.switchType()}
            >
              Change child component type
            </button>
          </div>
        </div>
        <div id="content">
          {this.state.children.map((item) =>
            this.state.childType === 1 ? (
              <Child key={item.id} />
            ) : (
              <Child2 key={item.id} id={item.id} />
            )
          )}
          {this.state.elements.map(() => (
            <div>-</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Scenario1;
