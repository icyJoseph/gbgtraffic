import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "../../functional";
import { fetchToken, selectId } from "../../ducks/auth";
import {
  getPermissionStatus,
  selectCoords,
  getMapToken
} from "../../ducks/geoLocation";

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
      </div>
    );
  }
}

export default connect(
  createSelector([selectId, selectCoords], (id, { lat, lng }) => ({
    id,
    lat,
    lng
  })),
  { fetchToken, getPermissionStatus, getMapToken }
)(Landing);
