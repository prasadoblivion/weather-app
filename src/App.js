import React from "react";
import "./App.scss";
import Search from "./components/search/search";
import CurrentWeather from "./components/currentWeather/currentWeather";
import "./windCSS/css/weather-icons.min.css"; //https://erikflowers.github.io/weather-icons/

function App() {
  return (
    <React.Fragment>
      <header></header>
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
    </React.Fragment>
  );
}

export default App;
