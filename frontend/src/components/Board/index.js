import React, { Component, Fragment } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

class Board extends Component {
  state = {
    value: 0
  };

  componentDidMount() {
    this.props.fetch();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { nearby, current } = this.props;
    const stop = nearby.find(item => item.id === current);
    if (!stop) {
      return this.props.close() && null;
    }
    const { track } = stop;
    return (
      <Fragment>
        <Typography variant="title" gutterBottom>
          Track {track} - {stop.name}
        </Typography>
        <Tabs
          position="sticky"
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab label="Departure" />
          <Tab label="Arrivals" />
        </Tabs>
        <div style={{ overflowX: "scroll", width: "100%" }}>
          <Table padding="dense">
            <TableHead>
              <TableRow>
                <TableCell>Line</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>
                  {this.state.value === 0 ? "Direction" : "Origin"}
                </TableCell>
              </TableRow>
            </TableHead>
            {this.state.value === 0 ? (
              <TableBody>
                {this.props.departures
                  .filter(trip => trip.track === track)
                  .map(departure => {
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
                {this.props.arrivals
                  .filter(trip => trip.track === track)
                  .map(arrival => {
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
        </div>
      </Fragment>
    );
  }
}

export default Board;
