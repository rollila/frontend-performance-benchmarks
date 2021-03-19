import React from "react";

export default class Node2 extends React.Component {
  render() {
    return (
      <div>
        {this.props.subtreeDepth > 0
          ? [...Array(this.props.branchingFactor)].map((_, i) => (
              <Node2
                key={i}
                branchingFactor={this.props.branchingFactor}
                subtreeDepth={this.props.subtreeDepth - 1}
              />
            ))
          : null}
        -
      </div>
    );
  }
}
