import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { DoubleArrow } from "@material-ui/icons";
import ScoreTag from "components/units/ScoreTag";
import { getEventById } from "redux/_actions";
import labels from "constants/labels";

const constants = labels.EventType;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: "rgb(239,244,252)"
  },
  header: {
    color: "rgb(50,53,101)",
    backgroundColor: "rgb(208,219,233)"
  },
  table: {
    width: "100%"
  },
  row: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  details: {
    padding: "0"
  },
  arrow: {
    transform: "rotate(90deg)"
  }
}));

export const EventType = props => {
  const classes = useStyles();
  const { group } = props;
  const [expanded, setExpanded] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [path, setPath] = useState("/");

  let history = useHistory();

  const rows = group[1].map(event => ({
    time: new Date(event.startTime).toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "numeric"
    }),
    name: event.name,
    scores: event.scores,
    eventId: event.eventId
  }));

  const onClickRow = eventId => {
    history.push("/");
    setPath(`/events/${eventId}`);
    setTimeout(() => setRedirect(true), 200);
  };

  if (redirect) {
    return <Redirect to={path} />;
  }

  return (
    <div className={clsx("EventType", classes.root)} data-testid="eventType">
      <Accordion expanded={expanded}>
        <AccordionSummary
          className={classes.header}
          expandIcon={
            <DoubleArrow fontSize="small" className={classes.arrow} />
          }
          onClick={() => setExpanded(!expanded)}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{group[0]}</Typography>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.details }}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {rows.map((row, idx) => (
                  <TableRow
                    className={classes.row}
                    key={`${row.name}_${idx}`}
                    onClick={() => onClickRow(row.eventId)}
                  >
                    <TableCell component="th" scope="row">
                      {row.time}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">
                      <ScoreTag scores={row.scores} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

EventType.defaultProps = {};

EventType.propTypes = { loading: PropTypes.bool, group: PropTypes.array };

const mapStateToProps = state => {
  const { loading } = state;
  return { loading };
};

const ConnectedEventType = connect(mapStateToProps, {
  getEventById
})(EventType);

export default ConnectedEventType;
