import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Search from "./components/search/search";
import CurrentWeather from "./components/currentWeather/currentWeather";
import FormatSwitch from "./components/formatSwitch/formatSwitch";
import Spinner from "./components/spinner/spinner";
import "./windCSS/css/weather-icons.min.css"; //https://erikflowers.github.io/weather-icons/

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <FormatSwitch />
        </header>
        <main>
          <div className="section-top-bg">
            <section>
              <Search />
            </section>

            <section>
              <CurrentWeather />
            </section>
          </div>

          <div className="section-bottom"></div>
        </main>

        <footer></footer>
        <Spinner show={this.props.showLoader} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    showLoader: state.weatherDataReducer[0].showLoader
  };
};

export default connect(mapStateToProps)(App);
