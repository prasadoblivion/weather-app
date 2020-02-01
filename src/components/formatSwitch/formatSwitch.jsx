import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./formatSwitch.scss";

class FormatSwitch extends Component {
  handleTempRadioBtnValueChanged = () => {
    this.props.showLoader();

    const tempFormat = document.querySelector("[name=tempFormat]:checked").value;

    const city = this.props.city;
    const api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=da7a1729e53b85f62484fe90209713db&units=" + tempFormat;

    axios.get(api, { validateStatus: false }).then(response => {
      this.props.changeTempFormat(tempFormat, response.data);
    });
  };

  render() {
    return (
      <div className="switch-field">
        <input type="radio" name="tempFormat" id="celsius" value="metric" defaultChecked onChange={this.handleTempRadioBtnValueChanged} />
        <label htmlFor="celsius">
          <sup>o</sup>C
        </label>

        <input type="radio" name="tempFormat" id="fahrenheit" value="imperial" onChange={this.handleTempRadioBtnValueChanged} />
        <label htmlFor="fahrenheit">
          <sup>o</sup>F
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    city: state.weatherDataReducer[0].city
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeTempFormat: (tempFormat, fetchedData) => {
      dispatch({ type: "CHANGE_TEMP_FORMAT", payload: [tempFormat, fetchedData] });
    },
    showLoader: () => {
      dispatch({ type: "SHOW_LOADER" });
    },
    hideLoader: () => {
      dispatch({ type: "HIDE_LOADER" });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormatSwitch);
