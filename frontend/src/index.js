import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Routes from "./routes";
import "./index.css";
import configureStore from "./ducks/config";
import { register } from "./serviceWorker";

const storedState = localStorage.getItem("bus-app");
const store = configureStore(storedState ? JSON.parse(storedState) : undefined);

const dodgerBlue = "#1E90FF";
const white = "#ffffff";

const theme = createMuiTheme({
  palette: {
    primary: { main: dodgerBlue },
    secondary: { main: white }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
register();
