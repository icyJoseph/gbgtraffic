import React from "react";
import MyLocation from "@material-ui/icons/MyLocation";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import Search from "@material-ui/icons/Search";
import { StyledButton } from "../../components/styled/Buttons";
import { Pinned } from "../../components/styled/Pinned";
import { curry } from "../../functional";

const goBack = history => history.push("/");

export const Bottom = ({ history }) => (
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
    <StyledButton variant="fab" color="primary" aria-label="search">
      <MyLocation fontSize="large" />
    </StyledButton>
  </Pinned>
);

export default Bottom;
