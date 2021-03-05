import React from "react";

import Row from "./Row.js";

export default class Scenario2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numRows: 0,
      numColumns: 0,
      rows: [],
    };
  }

  onUpdateRows(value) {
    this.setState({
      numRows: parseInt(value, 10),
    });
  }

  onUpdateColumns(value) {
    this.setState({
      numColumns: parseInt(value, 10),
    });
  }

  generate() {
    this.setState({
      rows: new Array(this.state.numRows).fill(null).map((_, i) => ({
        id: i,
        columns: new Array(this.state.numColumns).fill(null).map((_, y) => ({
          id: `row${i}-col${y}`,
        })),
      })),
    });
  }

  render() {
    return (
      <div>
        <div>
          <label>Number of rows</label>
          <input
            id="input-rows"
            type="number"
            min="1"
            value={this.state.numRows}
            onChange={(event) => this.onUpdateRows(event.target.value)}
          />
          <label>Number of columns</label>
          <input
            id="input-columns"
            type="number"
            min="1"
            value={this.state.numColumns}
            onChange={(event) => this.onUpdateColumns(event.target.value)}
          />
          <button id="btn-generate" onClick={() => this.generate()}>
            Generate
          </button>
        </div>
        {this.state.rows.map((row) => (
          <Row key={row.id} columns={row.columns} />
        ))}
      </div>
    );
  }
}
