import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchToken } from "../../ducks/auth";

export class Landing extends Component {
  componentDidMount() {
    this.props.fetchToken();
  }
  render() {
    return <div>BUS APP</div>;
  }
}

export default connect(
  undefined,
  { fetchToken }
)(Landing);
