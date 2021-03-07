import React from "react";

export default class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 1,
    };
  }
  render() {
    const changeA = () => {
      this.timeout = setTimeout(() => {
        this.setState({
          a: this.state.a + 1,
        });
      }, 500);
    };

    return (
      <div>
        <div>{this.state.a}</div>
        <Child fun={changeA} />
      </div>
    );
  }
}
