import React, { Component } from "react";

export class Display extends Component {
  render() {
    return (
      <div id="zero" className="card col-12">
        {this.props.data}
      </div>
    );
  }
}

export default Display;
