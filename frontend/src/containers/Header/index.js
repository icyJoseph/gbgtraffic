import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Avatar from "components/Avatar";
import { selectId, selectExpiry } from "ducks/auth";
import { createSelector } from "functional";

const styles = {
  grow: {
    flexGrow: 1
  }
};

export const Header = ({ id, classes, expiry }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.grow}>
        Bus App
      </Typography>
      <Avatar id={id} expiry={expiry} />
    </Toolbar>
  </AppBar>
);

export default connect(
  createSelector([selectId, selectExpiry], (id, expiry) => ({
    id,
    expiry
  }))
)(withStyles(styles)(Header));
