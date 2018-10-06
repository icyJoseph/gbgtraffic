import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "../../components/Avatar";
import { selectId } from "../../ducks/auth";
import { selectServerDate, selectServerTime } from "../../ducks/traffic";
import { createSelector } from "../../functional";

const styles = {
  grow: {
    flexGrow: 1
  },
  status: {
    flex: 1
  }
};
export const Header = ({ id, classes, date, time }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.grow}>
        Bus App
      </Typography>
      <Typography variant="body1" color="inherit" className={classes.status}>
        Server time: {time} - {date}
      </Typography>
      <Avatar id={id} />
    </Toolbar>
  </AppBar>
);

export default connect(
  createSelector(
    [selectId, selectServerDate, selectServerTime],
    (id, date, time) => ({
      id,
      date,
      time
    })
  )
)(withStyles(styles)(Header));
