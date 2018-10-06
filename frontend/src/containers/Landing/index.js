import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Marker from "../../components/Marker";
import Board from "../../components/Board";
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
  fetchBoard
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
          <div
            style={{
              position: "absolute",
              width: "80%",
              margin: "0 auto",
              bottom: "50px",
              zIndex: 10
            }}
          >
            <Paper
              elevation={3}
              style={{
                width: "75%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 auto",
                padding: "10px",
                height: "250px"
              }}
            >
              <Board
                current={this.props.currentStopId}
                nearby={this.props.nearby}
                departures={this.props.departures}
                arrivals={this.props.arrivals}
                fetch={this.props.fetchBoard}
                close={this.props.closeStopCard}
              />
              <Button onClick={this.props.closeStopCard}>close</Button>
            </Paper>
          </div>
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
