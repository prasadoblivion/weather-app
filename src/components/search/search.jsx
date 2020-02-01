import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./search.scss";

class Search extends Component {
  handleSearchFormSubmit = e => {
    e.preventDefault();

    const city = this.searchText.value;
    const api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=da7a1729e53b85f62484fe90209713db&units=metric";

    axios.get(api, { validateStatus: false }).then(response => {
      this.props.onSearchTextSubmit({ searchText: this.searchText.value, fetchedData: response.data });
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

const mapDispatchToProps = dispatch => {
  return {
    onSearchTextSubmit: searchText => {
      dispatch({ type: "SEARCH_TEXT_CHANGED", payload: searchText });
    }
  };
};

export default connect(null, mapDispatchToProps)(Search);
