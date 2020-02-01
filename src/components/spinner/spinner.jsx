import React, { Component } from "react";
import "./spinner.scss";

class Spinner extends Component {
  render() {
    let spinner = null;

    if (this.props.show) {
      spinner = (
        <div className="load-container">
          <div className="load">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      );
    }

    return spinner;
  }
}

export default Spinner;
