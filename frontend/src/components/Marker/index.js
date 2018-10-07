import React from "react";
import ReactDOM from "react-dom";
import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import { curry } from "../../functional";

import marker from "./marker.png";

export const Marker = ({ id, callback, track, reference, name }) => {
  const hook = document.getElementById(id);
  return (
    hook &&
    ReactDOM.createPortal(
      <Paper
        onClick={curry(callback)(id)}
        elevation={4}
        style={{
          width: "100%",
          padding: "2px",
          borderRadius: "10px",
          textAlign: "center"
        }}
      >
        <Typography variant="subheading" align="center" color="inherit">
          {track
            ? track
            : reference.filter(ref => ref.name === name && ref.track).length}
        </Typography>
        <img src={marker} alt="Marker" style={{ width: "30px" }} />
      </Paper>,
      hook
    )
  );
};

export default Marker;
