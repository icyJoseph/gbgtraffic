import React from "react";
import { connect } from "react-redux";
import DirectionsBus from "@material-ui/icons/DirectionsBus";
import LocationOn from "@material-ui/icons/LocationOn";
import LocationOff from "@material-ui/icons/LocationOff";
import ZoomIn from "@material-ui/icons/ZoomIn";
import ZoomOut from "@material-ui/icons/ZoomOut";

import { createSelector } from "../../functional";
import { getCurrentPosition, selectPermission } from "../../ducks/geoLocation";
import { fetchNearbyStops } from "../../ducks/traffic";
import { zoomIn, zoomOut } from "../../ducks/map";

import { StyledButton } from "../../components/styled/Buttons";
import { Pinned } from "../../components/styled/Pinned";

export const Bottom = ({
  increaseZoom,
  decreaseZoom,
  getPos,
  getStopsNearby,
  permission
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
      <DirectionsBus fontSize="large" />
    </StyledButton>
    <StyledButton
      variant="fab"
      color="primary"
      aria-label="search"
      onClick={getPos}
    >
      {permission === "granted" ? (
        <LocationOn fontSize="large" />
      ) : (
        <LocationOff fontSize="large" />
      )}
    </StyledButton>
  </Pinned>
);

export default connect(
  createSelector([selectPermission], permission => ({ permission })),
  {
    getPos: getCurrentPosition,
    getStopsNearby: fetchNearbyStops,
    increaseZoom: zoomIn,
    decreaseZoom: zoomOut
  }
)(Bottom);
