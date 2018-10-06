import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "../../functional";
import { fetchToken, selectId } from "../../ducks/auth";
import {
  getPermissionStatus,
  getMapToken,
  selectCoords,
  selectMapToken
} from "../../ducks/geoLocation";

import MapBox from "../../components/MapBox";
export class Landing extends Component {
  componentDidMount() {
    this.props.fetchToken();
    this.props.getPermissionStatus();
    this.props.getMapToken();
  }
  render() {
    return (
      <div>
        <div>You are: {this.props.id}</div>
        <div>
          and your location is:{" "}
          {`${this.props.lat ? `${this.props.lat} ${this.props.lng}` : ""}`}
        </div>
        <MapBox
          token={this.props.map_token}
          lat={this.props.lat}
          lng={this.props.lng}
        />
      </div>
    );
  }
}

export default connect(
  createSelector(
    [selectId, selectCoords, selectMapToken],
    (id, { lat, lng }, map_token) => ({
      id,
      lat,
      lng,
      map_token
    })
  ),
  { fetchToken, getPermissionStatus, getMapToken }
)(Landing);
