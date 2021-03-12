import React from "react";

export default class Node extends React.Component {
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
      <div>
        {this.props.items.map((item, i) => (
          <div key={i}>
            <span>{item.value0}</span>
            <span>{item.value1}</span>
            <span>{item.value2}</span>
            <span>{item.value3}</span>
            <span>{item.value4}</span>
            <span>{item.value5}</span>
            <span>{item.value6}</span>
            <span>{item.value7}</span>
            <span>{item.value8}</span>
            <span>{item.value9}</span>
          </div>
        ))}
        <div>
          {this.state.count}
          <button
            className="btn-increment-leaf"
            onClick={() => this.increment()}
          >
            Update
          </button>
        </div>
        {this.props.subtreeDepth > 0
          ? [...Array(this.props.branchingFactor)].map((_, i) => (
              <Node
                key={i}
                branchingFactor={this.props.branchingFactor}
                subtreeDepth={this.props.subtreeDepth - 1}
                items={this.props.items}
              />
            ))
          : null}
      </div>
    );
  }
}
