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
        {this.props.subtreeDepth > 0 ? (
          [...Array(this.props.branchingFactor)].map((_, i) => (
            <Node
              key={i}
              branchingFactor={this.props.branchingFactor}
              subtreeDepth={this.props.subtreeDepth - 1}
            />
          ))
        ) : (
          <div>
            {this.state.count}
            <button
              className="btn-increment-leaf"
              onClick={() => this.increment()}
            >
              Update leaf
            </button>
          </div>
        )}
      </div>
    );
  }
}
