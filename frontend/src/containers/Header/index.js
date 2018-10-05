import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export const Header = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="title" color="inherit">
        Bus App
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
