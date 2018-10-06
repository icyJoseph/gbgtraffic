import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Marker from "../../components/Marker";
import { createSelector } from "../../functional";
import { fetchToken } from "../../ducks/auth";
import {
  selectZoom,
  selectStopCard,
  openStopCard,
  closeStopCard
} from "../../ducks/map";
import {
  getPermissionStatus,
  getMapToken,
  selectCoords,
  selectMapToken,
  selectMapTokenExpiry
} from "../../ducks/geoLocation";
import { selectNearbyStopLocations } from "../../ducks/traffic";
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
          />
        )}
        {this.state.loadMarkers &&
          this.props.nearby.map(stop => (
            <Marker
              key={stop.id}
              {...stop}
              callback={this.props.openStopCard}
            />
          ))}
        {this.props.stopCardOpen && (
          <div style={{ position: "absolute", width: "100%", bottom: "100px" }}>
            <Paper
              elevation={3}
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 auto"
              }}
            >
              <div>DepartureBoard</div>
              <button onClick={this.props.closeStopCard}>close</button>
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
    selectStopCard
  ],
  ({ lat, lng }, map_token, map_token_expiry, nearby, zoom, stopCardOpen) => ({
    lat,
    lng,
    map_token,
    map_token_expiry,
    nearby,
    zoom,
    stopCardOpen
  })
);

const mapDispatchToProps = {
  fetchToken,
  getPermissionStatus,
  getMapToken,
  openStopCard,
  closeStopCard
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
