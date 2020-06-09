import React, { Fragment } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import { TableContainer } from "components/styled/Board";

function Board({ nearby, current, fetch, close, departures, arrivals }) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  const handleChange = (_, value) => {
    setValue(value);
  };

  const stop = nearby.find((item) => item.id === current);

  React.useEffect(() => {
    if (!stop) {
      close();
    }
  }, [stop, close]);

  if (!stop) {
    return null;
  }

  const { track } = stop;

  return (
    <Fragment>
      <Typography variant="title" gutterBottom>
        {track && `Track ${track} - `}
        {stop.name}
      </Typography>
      <Tabs
        position="sticky"
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        fullWidth
      >
        <Tab label="Departure" />
        <Tab label="Arrivals" />
      </Tabs>
      <TableContainer>
        <Table padding="dense">
          <TableHead>
            <TableRow>
              <TableCell>Line</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>{value === 0 ? "Direction" : "Origin"}</TableCell>
            </TableRow>
          </TableHead>
          {value === 0 ? (
            <TableBody>
              {departures
                // .filter(trip => !track || trip.track === track)
                .filter((trip) => !track || trip.track === track)
                .map((departure) => {
                  return (
                    <TableRow key={departure.journeyid}>
                      <TableCell>{departure.name}</TableCell>
                      <TableCell>{departure.time}</TableCell>
                      <TableCell>{departure.direction}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          ) : (
            <TableBody>
              {arrivals
                .filter((trip) => trip.track === track)
                .map((arrival) => {
                  return (
                    <TableRow key={arrival.journeyid}>
                      <TableCell>{arrival.name}</TableCell>
                      <TableCell>{arrival.time}</TableCell>
                      <TableCell>{arrival.origin}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Fragment>
  );
}

export default React.memo(Board);
