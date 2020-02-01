import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./currentWeather.scss";

class CurrentWeather extends Component {
  geoFindLocation = (tempFormat, city) => {
    const success = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const apiURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=da7a1729e53b85f62484fe90209713db&units=" + tempFormat;

      axios.get(apiURL, { validateStatus: false }).then(response => {
        this.props.onCurrentWeatherFetched(response.data);
      });
    };

    const error = () => {
      //failed to get location using geolocation api
      //then fetch location using IP

      axios.get("http://ip-api.com/json", { validateStatus: false }).then(
        response => {
          const apiURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + response.data.lat + "&lon=" + response.data.lon + "&APPID=da7a1729e53b85f62484fe90209713db&units=" + tempFormat;

          axios.get(apiURL, { validateStatus: false }).then(response => {
            this.props.onCurrentWeatherFetched(response.data);
          });
        },
        () => {
          const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=da7a1729e53b85f62484fe90209713db&units=" + tempFormat;

          axios.get(apiURL, { validateStatus: false }).then(response => {
            this.props.onCurrentWeatherFetched(response.data);
          });
        }
      );
    };

    if (!navigator.geolocation) {
      //geolocation not supported
      //then fetch location using IP

      axios.get("http://ip-api.com/json", { validateStatus: false }).then(
        response => {
          const apiURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + response.data.lat + "&lon=" + response.data.lon + "&APPID=da7a1729e53b85f62484fe90209713db&units=" + tempFormat;

          axios.get(apiURL, { validateStatus: false }).then(response => {
            this.props.onCurrentWeatherFetched(response.data);
          });
        },
        () => {
          const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + process.env.REACT_APP_OPEN_WEATHER_API_KEY + "&units=" + tempFormat;

          axios.get(apiURL, { validateStatus: false }).then(response => {
            this.props.onCurrentWeatherFetched(response.data);
          });
        }
      );
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  componentDidMount() {
    this.props.showLoader();

    const tempFormat = this.props.tempFormat;
    const city = this.props.city;

    this.geoFindLocation(tempFormat, city);
  }

  handleRefreshBtnClick = () => {
    this.props.showLoader();
    const tempFormat = this.props.tempFormat;
    const city = this.props.city;
    const api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + process.env.REACT_APP_OPEN_WEATHER_API_KEY + "&units=" + tempFormat;
    axios.get(api, { validateStatus: false }).then(response => {
      this.props.onCurrentWeatherFetched(response.data);
    });
  };

  fetchDataAtRegularInterals = timeInterval => {
    const minToMilliSec = timeInterval * 60 * 1000;
    setTimeout(() => {
      this.props.showLoader();
      const tempFormat = this.props.tempFormat;
      const city = this.props.city;
      const api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + process.env.REACT_APP_OPEN_WEATHER_API_KEY + "&units=" + tempFormat;
      axios.get(api, { validateStatus: false }).then(response => {
        this.props.onCurrentWeatherFetched(response.data);
      });
    }, minToMilliSec);
  };

  getTime = (tType, inptDateUnix) => {
    const hour = new Date(inptDateUnix * 1000).getHours();
    const minute = new Date(inptDateUnix * 1000).getMinutes();
    const seconds = new Date(inptDateUnix * 1000).getSeconds();

    if (tType === "hour") {
      return hour;
    } else if (tType === "minute") {
      return minute;
    } else if (tType === "seconds") {
      return seconds;
    } else if (tType === "fullTime") {
      const fullTime = hour + ":" + minute + ":" + seconds;
      return fullTime;
    }
  };

  render() {
    let weatherDescritption = null;
    let weatherIcon = null;
    let weatherTemp = null;
    let weatherMinTemp = null;
    let weatherMaxTemp = null;
    let weatherFeelsLike = null;
    let weatherHumidity = null;
    let weatherCity = null;
    let weatherCountry = null;
    let cityavailable = false;
    let currentWeatcherEle = null;
    let ctime = null;
    let cDate = null;
    let windSpeed = null;
    let windDirection = null;
    let sunrise = null;
    let sunset = null;
    let tempFormat = null;

    const weatherData = { ...this.props.currentWeatherData };

    if (weatherData.cod !== undefined && weatherData.cod !== "404") {
      weatherDescritption = weatherData.weather[0].description;
      const DayNight = weatherData.weather[0].icon.slice(-1) === "d" ? "-day" : "-night";
      const iconName = "wi wi-owm" + DayNight + "-" + weatherData.weather[0].id;
      weatherIcon = iconName;
      weatherTemp = weatherData.main.temp;
      weatherMinTemp = weatherData.main.temp_min;
      weatherMaxTemp = weatherData.main.temp_max;
      weatherFeelsLike = weatherData.main.feels_like;
      weatherHumidity = weatherData.main.humidity;
      weatherCity = weatherData.name;
      weatherCountry = weatherData.sys.country;
      cityavailable = true;
      ctime = new Date(weatherData.dt * 1000).toLocaleTimeString();
      cDate = new Date(weatherData.dt * 1000).toDateString();
      windSpeed = weatherData.wind.speed;
      windDirection = weatherData.wind.deg;
      sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
      sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();
      tempFormat = this.props.tempFormat === "metric" ? "C" : "F";
    } else if (weatherData.cod !== undefined && weatherData.cod === "404") {
      cityavailable = false;
    }

    if (cityavailable) {
      this.fetchDataAtRegularInterals(10);

      currentWeatcherEle = (
        <div className="container current-weather-container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="city-name">
                {weatherCity}
                <span className="country-code">{weatherCountry}</span>
              </div>
              <div className="date">{cDate}</div>
              <div className="row d-flex temp-conatiner">
                <div className="col weather-icon">
                  <i className={weatherIcon} aria-label={weatherDescritption + " icon"} />
                </div>
                <div className="col temp-text">
                  <div>
                    {weatherTemp}
                    <sup>o</sup> {tempFormat}
                  </div>
                </div>
              </div>
              <div className="weather-desc">{weatherDescritption}</div>
              <div className="row">
                <div className="col-sm-12 weather-other-details-conatiner">
                  <span className="weather-other-details">
                    <span className="weather-other-details-text">Min.</span>
                    {weatherMinTemp}
                    <sup>o</sup> {tempFormat}
                  </span>

                  <span className="weather-other-details">
                    <span className="weather-other-details-text">Max.</span>
                    {weatherMaxTemp}
                    <sup>o</sup> {tempFormat}
                  </span>
                </div>

                {/* <div className="col-sm-6 weather-other-details-conatiner">
                  <span className="weather-other-details">
                    <span className="weather-other-details-text">Feels like</span>
                    {weatherFeelsLike}
                    <sup>o</sup> C
                  </span>
                </div> */}
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="card other-weather-info">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="wi wi-humidity" aria-label="Humidity" title="Humidity"></i> {weatherHumidity}
                  </li>
                  <li className="list-group-item">
                    <i className="wi wi-strong-wind" aria-label="wind" title="wind"></i> {windSpeed} km/h &nbsp;<i className="wi wi-direction-left" aria-label={"wind direction " + windDirection + " degrees"} title={"wind direction " + windDirection + " degrees"} style={{ transform: "rotate(" + windDirection + "deg)", fontSize: "1.5rem" }}></i>
                  </li>
                  <li className="list-group-item">
                    <i className="wi wi-sunrise" aria-label="Sunrise" title="Sunrise"></i> {sunrise} <small>(Local)</small>
                  </li>
                  <li className="list-group-item">
                    <i className="wi wi-sunset" aria-label="Sunset" title="Sunset"></i> {sunset} <small>(Local)</small>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="last-updated-text">
                Data updated at: {ctime}{" "}
                <button className="btn refresh-btn" aria-label="Refresh" title="Refresh" onClick={this.handleRefreshBtnClick}>
                  <i className="wi wi-refresh"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      if (weatherData.cod === undefined) {
        currentWeatcherEle = (
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <p className="city-unavailable"></p>
              </div>
            </div>
          </div>
        );
      } else {
        currentWeatcherEle = (
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <p className="city-unavailable">City not found. Please try again.</p>
              </div>
            </div>
          </div>
        );
      }
    }

    return <div className="current-weather-wrapper">{currentWeatcherEle}</div>;
  }
}

const mapStateToProps = state => {
  return {
    city: state.weatherDataReducer[0].city,
    currentWeatherData: state.weatherDataReducer[0].weatherData,
    tempFormat: state.weatherDataReducer[0].tempFormat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCurrentWeatherFetched: inputData => {
      dispatch({ type: "CURRENT_WEATHER_DATA_FETCHED", payload: inputData });
    },
    showLoader: () => {
      dispatch({ type: "SHOW_LOADER" });
    },
    hideLoader: () => {
      dispatch({ type: "HIDE_LOADER" });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
