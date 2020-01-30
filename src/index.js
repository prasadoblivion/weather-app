import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import weatherDataReducer from "./reducers/weatherDataReducer";

const rootReducer = combineReducers({
  weatherDataReducer: weatherDataReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
