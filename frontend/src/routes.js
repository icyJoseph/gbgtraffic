import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Bottom from "./containers/Bottom";
import Landing from "./containers/Landing";
import Header from "./containers/Header";

const Router = () => (
  <BrowserRouter>
    <Fragment>
      <Route path="/" component={Header} />
      <Route path="/" component={Landing} />
      <Route path="/" component={Bottom} />
    </Fragment>
  </BrowserRouter>
);

export default Router;
