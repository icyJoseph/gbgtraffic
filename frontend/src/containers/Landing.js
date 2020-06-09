import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Marker from "components/Marker";
import Board from "components/Board";
import { BoardContainer, StyledPaperContainer } from "components/styled/Board";
import { createSelector } from "functional";
import { fetchToken } from "ducks/auth";
import {
  selectZoom,
  selectStopCardState,
  selectStopId,
  openStopCard,
  closeStopCard
} from "ducks/map";
import {
  fetchMapToken,
  setCurrentPosition,
  selectCoords,
  selectMapToken,
  selectMapTokenExpiry,
  flushMapToken
} from "ducks/geoLocation";
import {
  selectNearbyStopsFetchingStatus,
  selectNearbyStopLocations,
  selectDepartureBoard,
  selectArrivalBoard,
  fetchBoard
} from "ducks/traffic";

import MapBox from "components/MapBox";
import { debounce } from "utils/debounce";

function Landing({
  fetchToken,
  fetchMapToken,
  flushMapToken,
  nearby,
  ...props
}) {
  const [nearbyMarkers, setNearbyMarkers] = React.useState([]);

  const debouncedFetchMapToken = debounce(fetchMapToken, 500);
  const debouncedFlush = debounce(flushMapToken, 500);

  React.useEffect(() => {
    console.count("fetch vt token and map token");
    fetchToken();
    fetchMapToken();
  }, [fetchToken, fetchMapToken]);

  return (
    <div>
      {props.map_token && (
        <MapBox
          token={props.map_token}
          lat={props.lat}
          lng={props.lng}
          nearby={nearby}
          zoom={props.zoom}
          callback={setNearbyMarkers}
          fetching={props.fetching}
          setCurrentPosition={props.setCurrentPosition}
          fetchMapToken={debouncedFetchMapToken}
          flushMapToken={debouncedFlush}
        />
      )}
      {nearbyMarkers
        .filter(({ track }) => (props.zoom > 14 ? track : !track))
        .map((stop) => (
          <Marker key={stop.id} {...stop} callback={props.openStopCard} />
        ))}
      {props.stopCardState && (
        <BoardContainer>
          <StyledPaperContainer elevation={3}>
            <Board
              current={props.currentStopId}
              nearby={nearby}
              departures={props.departures}
              arrivals={props.arrivals}
              fetch={props.fetchBoard}
              close={props.closeStopCard}
            />
            <Button style={{ margin: "auto" }} onClick={props.closeStopCard}>
              Close
            </Button>
          </StyledPaperContainer>
        </BoardContainer>
      )}
    </div>
  );
}

const mapStateToProps = createSelector(
  [
    selectCoords,
    selectMapToken,
    selectMapTokenExpiry,
    selectNearbyStopLocations,
    selectZoom,
    selectStopCardState,
    selectStopId,
    selectNearbyStopsFetchingStatus,
    selectDepartureBoard,
    selectArrivalBoard
  ],
  (
    { lat, lng },
    map_token,
    map_token_expiry,
    nearby,
    zoom,
    stopCardState,
    currentStopId,
    fetching,
    departures,
    arrivals
  ) => ({
    lat,
    lng,
    map_token,
    map_token_expiry,
    nearby,
    zoom,
    stopCardState,
    currentStopId,
    fetching,
    departures,
    arrivals
  })
);

const mapDispatchToProps = {
  fetchToken,
  fetchMapToken,
  flushMapToken,
  openStopCard,
  closeStopCard,
  fetchBoard,
  setCurrentPosition
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Landing));
