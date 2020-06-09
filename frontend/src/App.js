import React, { Fragment } from "react";

import {
  SuspenseBanner,
  SuspenseBottom,
  SuspenseLanding,
  SuspenseHeader,
  SuspenseUpdate
} from "lazy";

export const App = () => (
  <Fragment>
    <SuspenseHeader />
    <SuspenseBanner />
    <SuspenseLanding />
    <SuspenseBottom />
    <SuspenseUpdate />
  </Fragment>
);
