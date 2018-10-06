import React from "react";
import { connect } from "react-redux";
import MyLocation from "@material-ui/icons/MyLocation";
import LocationOn from "@material-ui/icons/LocationOn";
import ZoomIn from "@material-ui/icons/ZoomIn";
import ZoomOut from "@material-ui/icons/ZoomOut";

import { getCurrentPosition } from "../../ducks/geoLocation";
import { fetchNearbyStops } from "../../ducks/traffic";
import { zoomIn, zoomOut } from "../../ducks/map";

import { StyledButton } from "../../components/styled/Buttons";
import { Pinned } from "../../components/styled/Pinned";

export const Bottom = ({
  increaseZoom,
  decreaseZoom,
  getPos,
  getStopsNearby
}) => (
  <Pinned>
    <StyledButton
      variant="fab"
      color="primary"
      aria-label="back"
      onClick={decreaseZoom}
    >
      <ZoomOut fontSize="large" />
    </StyledButton>
    <StyledButton
      variant="fab"
      color="primary"
      aria-label="back"
      onClick={increaseZoom}
    >
      <ZoomIn fontSize="large" />
    </StyledButton>

    <StyledButton
      variant="fab"
      color="primary"
      aria-label="search"
      onClick={getStopsNearby}
    >
      <MyLocation fontSize="large" />
    </StyledButton>
    <StyledButton
      variant="fab"
      color="primary"
      aria-label="search"
      onClick={getPos}
    >
      <LocationOn fontSize="large" />
    </StyledButton>
  </Pinned>
);

export default connect(
  undefined,
  {
    getPos: getCurrentPosition,
    getStopsNearby: fetchNearbyStops,
    increaseZoom: zoomIn,
    decreaseZoom: zoomOut
  }
)(Bottom);
