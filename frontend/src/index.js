import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Routes from "./routes";
import "./index.css";
import configureStore from "./ducks/config";
import { register } from "./serviceWorker";

const storedState = localStorage.getItem("bus-app");
const store = configureStore(storedState ? JSON.parse(storedState) : undefined);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
register();
