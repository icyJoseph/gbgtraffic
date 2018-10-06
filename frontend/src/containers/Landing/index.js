import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Marker from "../../components/Marker";
import Typography from "@material-ui/core/Typography";

import Board from "../../components/Board";
import {
  BoardContainer,
  StyledPaperContainer
} from "../../components/Board/styled";
import { createSelector } from "../../functional";
import { fetchToken } from "../../ducks/auth";
import {
  selectZoom,
  selectStopCardState,
  selectStopId,
  openStopCard,
  closeStopCard
} from "../../ducks/map";
import {
  getPermissionStatus,
  getMapToken,
  setCurrentPosition,
  selectCoords,
  selectMapToken,
  selectMapTokenExpiry
} from "../../ducks/geoLocation";
import {
  selectNearbyStopsFetchingStatus,
  selectNearbyStopLocations,
  selectDepartureBoard,
  selectArrivalBoard,
  fetchBoard,
  selectServerDate,
  selectServerTime
} from "../../ducks/traffic";
import MapBox from "../../components/MapBox";

export class Landing extends Component {
  state = {
    loadMarkers: false
  };

  toggleLoadMarkers = () => this.setState({ loadMarkers: true });
  componentDidMount() {
    this.props.fetchToken();
    this.props.getPermissionStatus();
    this.props.getMapToken();
  }
  render() {
    const mapTokenExpired = new Date().getTime() > this.props.map_token_expiry;
    return (
      <div>
        <Paper style={{ width: "80%", maxWidth: "500px", margin: "10px auto" }}>
          <Typography variant="body1" color="inherit" align="center">
            Server time: {this.props.time} - {this.props.date}
          </Typography>
        </Paper>
        {!mapTokenExpired && (
          <MapBox
            token={this.props.map_token}
            lat={this.props.lat}
            lng={this.props.lng}
            nearby={this.props.nearby}
            zoom={this.props.zoom}
            callback={this.toggleLoadMarkers}
            fetching={this.props.fetching}
            setCurrentPosition={this.props.setCurrentPosition}
          />
        )}
        {this.state.loadMarkers &&
          this.props.nearby
            .filter(({ track }) => (this.props.zoom > 13 ? track : !track))
            .map(stop => (
              <Marker
                key={stop.id}
                reference={this.props.nearby}
                {...stop}
                callback={this.props.openStopCard}
              />
            ))}
        {this.props.stopCardState && (
          <BoardContainer>
            <StyledPaperContainer elevation={3}>
              <Board
                current={this.props.currentStopId}
                nearby={this.props.nearby}
                departures={this.props.departures}
                arrivals={this.props.arrivals}
                fetch={this.props.fetchBoard}
                close={this.props.closeStopCard}
              />
              <Button onClick={this.props.closeStopCard}>Close</Button>
            </StyledPaperContainer>
          </BoardContainer>
        )}
      </div>
    );
  }
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
    selectArrivalBoard,
    selectServerDate,
    selectServerTime
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
    arrivals,
    date,
    time
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
    arrivals,
    date,
    time
  })
);

const mapDispatchToProps = {
  fetchToken,
  getPermissionStatus,
  getMapToken,
  openStopCard,
  closeStopCard,
  fetchBoard,
  setCurrentPosition
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
