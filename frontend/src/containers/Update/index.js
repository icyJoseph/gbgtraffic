import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

class Update extends Component {
  state = {
    open: false,
    vertical: "bottom",
    horizontal: "center"
  };

  componentDidMount() {
    window.addEventListener("message", this.openSnackBar);
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.openSnackBar);
  }

  openSnackBar = event => {
    const { data } = event;
    if (data.type === "WORKER_UPDATE") {
      return this.setState({ open: true });
    }
    return null;
  };

  refreshPage = () =>
    new Promise(resolve => resolve(localStorage.removeItem("bus-app"))).then(
      () => window.location.reload()
    );

  render() {
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          message={<span id="message-id">Update available!</span>}
          action={
            <Button
              color="inherit"
              style={{ color: "rgba(255,0,80)" }}
              onClick={this.refreshPage}
            >
              Refresh
            </Button>
          }
        />
      </div>
    );
  }
}

export default Update;
