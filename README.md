# Bus/Tram Stops Around You!

Demo available at [BusApp](https://wiry-coal.surge.sh/).

Usage notes:

> You can drag the main marker.

> Clicking the bus icon displays stops around the marker.

> Clicking the Location icon centers the map on the user's current position.

Tech stack:

> Create-react-app, with Redux, styled-components and MUI.

> GeoLocation is done through [MapBox's API](https://www.mapbox.com/).

> The MapBox component uses MapBox's [mapbox-gl-js API](https://www.mapbox.com/install/js/).

> [Västtraffik's API](https://developer.vasttrafik.se/portal/#/) is used to fetch depature/arrival data.

> Access tokens are temporary and generated through a [webtask](https://webtask.io/).

> [Redux-Saga](https://github.com/redux-saga/redux-saga) to manage side effects.

> PWA ready. It even uses web API for geolocation.

> The 8x8 grid on the top right is a graphical representation of the user's ID.

This application was rebuilt as part of a solo weekend hack!
