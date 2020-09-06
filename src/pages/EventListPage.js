import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { connect } from "react-redux";
import { getLiveEventList, getEventById } from "redux/_actions";
import { filterDisplayableEvents } from "redux/selectors";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const EventListPage = props => {
  const classes = useStyles();

  const { liveEvents } = props;

  console.log("liveEvents", liveEvents.length);

  const rows = liveEvents.map(event => ({
    time: event.startTime,
    name: event.name,
    sort: event.sort
  }));

  useEffect(() => {
    props.getLiveEventList(false);
    props.getEventById(21249945);
  }, []);
  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Boost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.time}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.sort}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

EventListPage.defaultProps = { liveEvents: [] };

EventListPage.propTypes = { liveEvents: PropTypes.array };

const mapStateToProps = (state, props) => {
  return {
    liveEvents: filterDisplayableEvents(state, props)
  };
};

const ConnectedEventListPage = connect(mapStateToProps, {
  getLiveEventList,
  getEventById
})(EventListPage);

export default ConnectedEventListPage;
