import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Banner from "./containers/Banner";
import Bottom from "./containers/Bottom";
import Landing from "./containers/Landing";
import Header from "./containers/Header";
import Update from "./containers/Update";

const Router = () => (
  <BrowserRouter>
    <Fragment>
      <Route path="/" component={Header} />
      <Banner />
      <Route path="/" component={Landing} />
      <Route path="/" component={Bottom} />
      <Update />
    </Fragment>
  </BrowserRouter>
);

export default Router;
