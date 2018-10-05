import React from "react";
import { connect } from "react-redux";
import MyLocation from "@material-ui/icons/MyLocation";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import Search from "@material-ui/icons/Search";

import { getCurrentPosition } from "../../ducks/geoLocation";

import { StyledButton } from "../../components/styled/Buttons";
import { Pinned } from "../../components/styled/Pinned";
import { curry } from "../../functional";

const goBack = history => history.push("/");

export const Bottom = ({ history, getPos }) => (
  <Pinned>
    <StyledButton
      variant="fab"
      color="primary"
      aria-label="back"
      onClick={curry(goBack)(history)}
    >
      <NavigateBefore fontSize="large" />
    </StyledButton>
    <StyledButton variant="fab" color="primary" aria-label="search">
      <Search fontSize="large" />
    </StyledButton>
    <StyledButton
      variant="fab"
      color="primary"
      aria-label="search"
      onClick={getPos}
    >
      <MyLocation fontSize="large" />
    </StyledButton>
  </Pinned>
);

export default connect(
  undefined,
  { getPos: getCurrentPosition }
)(Bottom);
