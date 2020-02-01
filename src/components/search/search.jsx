import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./search.scss";

class Search extends Component {
  handleSearchFormSubmit = e => {
    this.props.showLoader();
    e.preventDefault();

    const city = this.searchText.value;
    const tempFormat = this.props.tempFormat;
    const apiURLopencagedata = "https://api.opencagedata.com/geocode/v1/json?no_annotations=1&key=" + process.env.REACT_APP_OPEN_CAGE_DATA_API_KEY + "&q=" + city;

    axios.get(apiURLopencagedata, { validateStatus: false }).then(responseOpencagedata => {
      if (responseOpencagedata.data.results.length > 0) {
        // const latitude = response.data.results[0].geometry.lat;
        // const longitude = response.data.results[0].geometry.lng;

        let cityFound = false;

        responseOpencagedata.data.results.forEach(value => {
          if (cityFound === false) {
            if (value.components.city !== undefined && value.components._type === "city") {
              const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + value.components.city + "&APPID=" + process.env.REACT_APP_OPEN_WEATHER_API_KEY + "&units=" + tempFormat;

              axios.get(apiURL, { validateStatus: false }).then(response => {
                this.props.onSearchTextSubmit({ searchText: response.data.name, fetchedData: response.data });

                cityFound = true;
              });
            }
          }
        });

        if (cityFound === false) {
          this.props.onSearchTextSubmit({ searchText: city, fetchedData: { cod: "404" } });
        }
      } else {
        this.props.onSearchTextSubmit({ searchText: city, fetchedData: { cod: "404" } });
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="search-area">
              <form onSubmit={this.handleSearchFormSubmit} className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Enter city name"
                  aria-label="Search"
                  ref={searchText => {
                    this.searchText = searchText;
                  }}
                  required
                />
                <button className="btn seach-icon">
                  <span className="sr-only">Search</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tempFormat: state.weatherDataReducer[0].tempFormat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchTextSubmit: searchText => {
      dispatch({ type: "SEARCH_TEXT_CHANGED", payload: searchText });
    },
    showLoader: () => {
      dispatch({ type: "SHOW_LOADER" });
    },
    hideLoader: () => {
      dispatch({ type: "HIDE_LOADER" });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
