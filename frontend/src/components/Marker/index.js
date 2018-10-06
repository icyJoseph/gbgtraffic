import React from "react";
import ReactDOM from "react-dom";
import { curry } from "../../functional";

import marker from "./marker.png";

export const Marker = ({ id, callback }) => {
  const hook = document.getElementById(id);
  return ReactDOM.createPortal(
    <div onClick={curry(callback)(id)}>
      <img src={marker} alt="Marker" style={{ width: "30px" }} />
    </div>,
    hook
  );
};

export default Marker;
