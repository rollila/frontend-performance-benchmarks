import React from "react";

export default class Child extends React.Component {
  render() {
    return <span>{this.props.id}</span>;
  }
}
