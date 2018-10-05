import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./containers/Landing";

const Router = () => (
  <BrowserRouter>
    <Route path="/" component={Landing} />
  </BrowserRouter>
);

export default Router;
