import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "../../functional";
import { fetchToken, selectId } from "../../ducks/auth";

export class Landing extends Component {
  componentDidMount() {
    this.props.fetchToken();
  }
  render() {
    console.log(this.props);
    return <div>You are: {this.props.id}</div>;
  }
}

export default connect(
  createSelector([selectId], id => ({ id })),
  { fetchToken }
)(Landing);
