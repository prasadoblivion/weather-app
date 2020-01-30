import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./currentWeather.scss";

class CurrentWeather extends Component {
  componentDidMount() {
    const city = this.props.city;
    const api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=da7a1729e53b85f62484fe90209713db&units=metric";
    axios.get(api, { validateStatus: false }).then(response => {
      this.props.onCurrentWeatherFetched(response.data);
    });
  }

  fetchDataAtRegularInterals = timeInterval => {
    const minToMilliSec = timeInterval * 60 * 1000;
    setTimeout(() => {
      const city = this.props.city;
      const api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=da7a1729e53b85f62484fe90209713db&units=metric";
      axios.get(api, { validateStatus: false }).then(response => {
        this.props.onCurrentWeatherFetched(response.data);
      });
    }, minToMilliSec);
  };

  render() {
    let weatherDescritption = null;
    let weatherIcon = null;
    let weatherTemp = null;
    let weatherMinTemp = null;
    let weatherMaxTemp = null;
    let weatherHumidity = null;
    let weatherCity = null;
    let weatherCountry = null;
    let cityavailable = false;
    let currentWeatcherEle = null;
    let ctime = null;
    let cDate = null;

    if (this.props.currentWeatherData.cod !== undefined && this.props.currentWeatherData.cod !== "404") {
      weatherDescritption = this.props.currentWeatherData.weather[0].description;
      weatherIcon = require("../../assets/img/w-icons/lg/" + this.props.currentWeatherData.weather[0].icon + ".png");
      weatherTemp = this.props.currentWeatherData.main.temp;
      weatherMinTemp = this.props.currentWeatherData.main.temp_min;
      weatherMaxTemp = this.props.currentWeatherData.main.temp_max;
      weatherHumidity = this.props.currentWeatherData.main.humidity;
      weatherCity = this.props.currentWeatherData.name;
      weatherCountry = this.props.currentWeatherData.sys.country;
      cityavailable = true;
      ctime = new Date(this.props.currentWeatherData.dt * 1000).toLocaleTimeString();
      cDate = new Date(this.props.currentWeatherData.dt * 1000).toDateString();
    } else if (this.props.currentWeatherData.cod !== undefined && this.props.currentWeatherData.cod === "404") {
      cityavailable = false;
    }

    if (cityavailable) {
      // this.fetchDataAtRegularInterals(1);

      currentWeatcherEle = (
        <React.Fragment>
          <div className="current-weather-area">
            <p className="weather-description">{weatherDescritption}</p>

            <div className="temp-container temp-container-lg">
              <div className="weather-icon">
                <img src={weatherIcon} alt={weatherDescritption + " icon"} />
              </div>
              <div className="weather-current-temp">
                {weatherTemp}
                <sup>o</sup> C
              </div>
            </div>

            <div className="weather-other-details">
              <div>
                <span className="weather-other-details-text">Min.</span>
                {weatherMinTemp}
                <sup>o</sup> C
              </div>

              <div>
                <span className="weather-other-details-text">Max.</span>
                {weatherMaxTemp}
                <sup>o</sup> C
              </div>

              <div>
                <span className="weather-other-details-text">Humidity</span>
                {weatherHumidity}
              </div>
            </div>

            <div className="weather-date-time">
              <p className="last-fetch-time-text">Refreshed at: </p>
              <div className="weather-time">{ctime}</div>
              <div className="weather-date">{cDate}</div>
            </div>
          </div>

          <div className="current-city-area">
            <div className="current-city">
              {weatherCity} <span className="current-city-country">{weatherCountry}</span>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      currentWeatcherEle = <p className="city-unavailable">City not found. Please try again.</p>;
    }

    return <div className="current-weather-wrapper">{currentWeatcherEle}</div>;
  }
}

const mapStateToProps = state => {
  return {
    city: state.weatherDataReducer[0].city,
    currentWeatherData: state.weatherDataReducer[0].weatherData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCurrentWeatherFetched: inputData => {
      dispatch({ type: "CURRENT_WEATHER_DATA_FETCHED", payload: inputData });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
