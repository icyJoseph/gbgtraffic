import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { selectServerDate, selectServerTime } from "../../ducks/traffic";

import { createSelector } from "../../functional";

export class Banner extends Component {
  // Show different messages
  render() {
    const { date, time } = this.props;
    return (
      <Paper style={{ width: "80%", maxWidth: "500px", margin: "10px auto" }}>
        <Typography variant="body1" color="inherit" align="center">
          Server time: {time} - {date}
        </Typography>
      </Paper>
    );
  }
}

export default connect(
  createSelector([selectServerDate, selectServerTime], (date, time) => ({
    date,
    time
  }))
)(Banner);
