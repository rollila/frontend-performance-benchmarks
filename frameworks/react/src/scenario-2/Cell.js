import React from "react";

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <span>
        Prop value: {this.props.value}, internal value: {this.state.count}
        <button class="cell-btn-increment" onClick={() => this.increment()}>
          Update child
        </button>
      </span>
    );
  }
}
