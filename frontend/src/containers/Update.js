import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

function Update() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const openSnackBar = (event) => {
      const { data } = event;
      if (data.type === "WORKER_UPDATE") {
        return setOpen(true);
      }
      return null;
    };

    window.addEventListener("message", openSnackBar);

    return () => {
      window.removeEventListener("message", openSnackBar);
    };
  }, []);

  const refreshPage = () =>
    new Promise((resolve) =>
      resolve(localStorage.removeItem("bus-app"))
    ).then(() => window.location.reload());

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        message={<span id="message-id">New version available!</span>}
        action={
          <Button
            color="inherit"
            style={{ color: "rgba(255,0,80)" }}
            onClick={refreshPage}
          >
            Update
          </Button>
        }
      />
    </div>
  );
}

export default Update;
