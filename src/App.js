import React from "react";
import "./App.scss";
import Search from "./components/search/search";
import CurrentWeather from "./components/currentWeather/currentWeather";

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
