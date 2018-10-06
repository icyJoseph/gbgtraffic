import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

export const BoardContainer = styled.div`
  position: absolute;
  width: 80%;
  margin: 0 auto;
  bottom: 50px;
  z-index: 10;
  @media (min-width: 1023px) {
    width: 500px;
  }
`;

export const StyledPaperContainer = styled(Paper).attrs({
  style: () => ({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    padding: "10px",
    height: "250px"
  })
})`
  @media (min-width: 1023px) {
    height: 100% !important;
    width: 400px !important;
  }
`;

export const TableContainer = styled.div`
  overflow-x: scroll;
  width: 100%;

  @media (min-width: 1023px) {
    height: 100%;
    width: 400px;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
