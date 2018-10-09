import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  selectServerDate,
  selectServerTime,
  selectFetchingState
} from "../../ducks/traffic";
import { createSelector } from "../../functional";

const showDate = (time, date) =>
  time && date ? `Server time: ${time} - ${date}` : "Ready to start!";

const isFetchingMessage = (fetching, time, date) =>
  fetching ? "Fetching resources." : showDate(time, date);

export class Banner extends Component {
  // Show different messages
  render() {
    const { time, date, fetching, error } = this.props;
    return (
      <Paper style={{ width: "80%", maxWidth: "500px", margin: "10px auto" }}>
        <Typography variant="body1" color="inherit" align="center">
          {error
            ? "Error while fetching, please retry."
            : isFetchingMessage(fetching, time, date)}
        </Typography>
      </Paper>
    );
  }
}

export default connect(
  createSelector(
    [selectServerDate, selectServerTime, selectFetchingState],
    (date, time, { fetching, error }) => ({
      date,
      time,
      fetching,
      error
    })
  )
)(Banner);
