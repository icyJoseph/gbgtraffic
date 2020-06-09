import React, { lazy, Suspense } from "react";

const LazyBanner = lazy(() =>
  import(/* webpackChunkName: "Banner" */ "containers/Banner")
);
const LazyBottom = lazy(() =>
  import(
    /* webpackChunkName: "Bottom", webpackPrefetch: true */ "containers/Bottom"
  )
);
const LazyLanding = lazy(() =>
  import(
    /* webpackChunkName: "Landing", webpackPreload: true */ "containers/Landing"
  )
);
const LazyHeader = lazy(() =>
  import(
    /* webpackChunkName: "Header", webpackPrefetch: true */ "containers/Header"
  )
);
const LazyUpdate = lazy(() =>
  import(/* webpackChunkName: "Update" */ "containers/Update")
);

export const SuspenseBanner = (props) => (
  <Suspense fallback={null}>
    <LazyBanner {...props} />
  </Suspense>
);
export const SuspenseBottom = (props) => (
  <Suspense fallback={null}>
    <LazyBottom {...props} />
  </Suspense>
);
export const SuspenseLanding = (props) => (
  <Suspense fallback={null}>
    <LazyLanding {...props} />
  </Suspense>
);
export const SuspenseHeader = (props) => (
  <Suspense fallback={null}>
    <LazyHeader {...props} />
  </Suspense>
);
export const SuspenseUpdate = (props) => (
  <Suspense fallback={null}>
    <LazyUpdate {...props} />
  </Suspense>
);
