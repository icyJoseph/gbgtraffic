import React, { Fragment } from "react";

import Banner from "containers/Banner";
import Bottom from "containers/Bottom";
import Landing from "containers/Landing";
import Header from "containers/Header";
import Update from "containers/Update";

export const App = () => (
  <Fragment>
    <Header />
    <Banner />
    <Landing />
    <Bottom />
    <Update />
  </Fragment>
);
