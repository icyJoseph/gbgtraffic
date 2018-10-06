# Bus/Tram Stops Around You!

Demo available at [BusApp](https://wiry-coal.surge.sh/).

Usage notes:

> You can drag the main marker.

> Clicking the bus icon displays stops around the marker.

> Clicking the Location icon centers the map on the user's current position.

Tech stack:

> Create-react-app, with Redux, styled-components and MUI.

> GeoLocation is done through MapBox's API.

> The MapBox component uses MapBox's map-gl API.

> Västtraffik's API is used to fetch depature/arrival data.

> Access tokens are temporary and generated through a webtask.

> Redux-Sagas to manage side effects.

> PWA ready. It even uses web API for geolocation.

> The 8x8 grid on the top right is a graphical representation of the user's ID.

This application was rebuilt as part of a solo weekend hack!
