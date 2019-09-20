import React, { Component } from "react";
import Display from "./Display";
import * as math from "mathjs";
import Button from "./Button.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      buttons: [
        { id: "num", val: 7 },
        { id: "num", val: 8 },
        { id: "num", val: 9 },
        { id: "sign", val: "*" },
        { id: "num", val: 4 },
        { id: "num", val: 5 },
        { id: "num", val: 6 },
        { id: "sign", val: "+" },
        { id: "num", val: 1 },
        { id: "num", val: 2 },
        { id: "num", val: 3 },
        { id: "sign", val: "-" },
        { id: "num", val: 0 },
        { id: "sign", val: "." },
        { id: "sign", val: "/" },
        { id: "sign", val: "=" }
      ],
      operations: ["0"],
      sign: ["-", "+", "/", "*"]
    };
  }
  getResult = () => {
    let result = this.state.operations.join("");
    //if you accidentally leave the last char to be operator it removes it and
    // gets the result
    if (this.state.sign.includes(result[result.length - 1])) {
      result = result.substring(0, result.length - 1);
    }
    if (result) {
      result = math.evaluate(result);
      result = math.format(result, { precision: 14 });
      result = String(result);
      this.setState({
        operations: [result]
      });
    }
    console.log(this.state);
  };
  //clear everything
  handleclear = e => {
    e.preventDefault();
    this.setState({
      operations: ["0"]
    });
  };

  handleclick = e => {
    e.preventDefault();
    let last = this.state.operations.length - 1;

    //changes the operator so they dont stack up
    if (
      this.state.sign.includes(this.state.operations[last]) &&
      this.state.sign.includes(e.target.value)
    ) {
      let newarr = [...this.state.operations];
      newarr.pop();
      newarr.push(e.target.value);
      this.setState({
        operations: newarr
      });
    } else if (
      //first characher cannot be 0 and cannot be a operator
      this.state.operations[0] === "0" &&
      !this.state.sign.includes(e.target.value)
    ) {
      this.setState({
        operations: [e.target.value]
      });
    } else {
      this.setState({
        operations: [...this.state.operations, e.target.value]
      });
    }
  };

  render() {
    var buttonList = this.state.buttons.map(elem => {
      var handle = elem.val === "=" ? this.getResult : this.handleclick;
      return (
        <Button
          key={elem.val}
          val={elem.val}
          id={elem.id}
          handleclick={handle}
        />
      );
    });

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <Display data={this.state.operations} />
          </div>
          <div className="row">
            <button
              id="clear"
              className="btn btn-primary col-12"
              onClick={this.handleclear}
            >
              Clear
            </button>
          </div>
          <div className="row">{buttonList.slice(0, 4)}</div>
          <div className="row">{buttonList.slice(4, 8)}</div>
          <div className="row">{buttonList.slice(8, 12)}</div>
          <div className="row">{buttonList.slice(12, 16)}</div>
        </div>
      </div>
    );
  }
}

export default App;
