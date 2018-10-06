import React, { Component } from "react";
import { connect } from "react-redux";

import Marker from "../../components/Marker";
import { createSelector } from "../../functional";
import { fetchToken, selectId } from "../../ducks/auth";
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
        <div style={{ background: "white" }}>
          <div>You are: {this.props.id}</div>
          <div>
            and your location is:{" "}
            {`${this.props.lat ? `${this.props.lat} ${this.props.lng}` : ""}`}
          </div>
        </div>
        {!mapTokenExpired && (
          <MapBox
            token={this.props.map_token}
            lat={this.props.lat}
            lng={this.props.lng}
            nearby={this.props.nearby}
            callback={this.toggleLoadMarkers}
          />
        )}
        {this.state.loadMarkers &&
          this.props.nearby.map(stop => <Marker key={stop.id} {...stop} />)}
      </div>
    );
  }
}

export default connect(
  createSelector(
    [
      selectId,
      selectCoords,
      selectMapToken,
      selectMapTokenExpiry,
      selectNearbyStopLocations
    ],
    (id, { lat, lng }, map_token, map_token_expiry, nearby) => ({
      id,
      lat,
      lng,
      map_token,
      map_token_expiry,
      nearby
    })
  ),
  { fetchToken, getPermissionStatus, getMapToken }
)(Landing);
