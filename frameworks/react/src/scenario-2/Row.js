import React from "react";

import Cell from "./Cell.js";

export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      offset: 0,
    };
  }

  onInput() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  updateRow() {
    this.setState({
      offset: this.state.offset + 1,
    });
  }

  render() {
    return (
      <div>
        <div>
          Row count: {this.state.count}
          <button
            class="row-btn-update-children"
            onClick={() => this.updateRow()}
          >
            Update children
          </button>
          <button class="row-btn-update-self" onClick={() => this.onInput()}>
            Upate parent
          </button>
        </div>
        {this.props.columns.map((column, i) => (
          <Cell key={column.id} value={i + this.state.offset} />
        ))}
      </div>
    );
  }
}
