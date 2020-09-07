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
  Grid,
  Box,
  Paper,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { ExpandMore, Clear } from "@material-ui/icons";
import SelectionUnit from "components/units/SelectionUnit";
import { getEventById } from "redux/_actions";
import labels from "constants/labels";

const constants = labels.Selections;

const useStyles = makeStyles(theme => ({
  root: {
    width: "95%",
    margin: "10px auto"
  },
  header: {
    color: "#fff",
    backgroundColor: "rgb(10,40,108)",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px"
  },
  icon: { color: "#fff" },
  details: {
    padding: 0,
    flexDirection: "column"
  }
}));

export const Selections = props => {
  const classes = useStyles();
  const { isOddsDecimal, selections } = props;
  const [expanded, setExpanded] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [path, setPath] = useState("/");

  let content;
  if (selections.length > 0) {
    content = selections.map(selection => (
      <SelectionUnit outcome={selection} />
    ));
  }
  //   const rows = group[1].map(event => ({
  //     time: new Date(event.startTime).toLocaleTimeString("en-GB", {
  //       hour: "numeric",
  //       minute: "numeric"
  //     }),
  //     name: event.name,
  //     scores: event.scores,
  //     eventId: event.eventId
  //   }));

  //   const onClickRow = eventId => {
  //     history.push("/");
  //     setPath(`/events/${eventId}`);
  //     setTimeout(() => setRedirect(true), 200);
  //   };

  return (
    <div className={clsx("Selections", classes.root)}>
      <Accordion expanded={expanded}>
        <AccordionSummary
          className={classes.header}
          onClick={() => setExpanded(!expanded)}
          expandIcon={<ExpandMore fontSize="small" className={classes.icon} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{`Singles`}</Typography>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.details }}>
          {content}
          {/* <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {rows.map(row => (
                  <TableRow
                    className={classes.row}
                    key={row.name}
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
          </TableContainer> */}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

Selections.defaultProps = { selections: [] };

Selections.propTypes = { selections: PropTypes.array };

const mapStateToProps = state => {
  const { selections, isOddsDecimal } = state;
  return { selections, isOddsDecimal };
};

const ConnectedSelections = connect(mapStateToProps, {
  getEventById
})(Selections);

export default ConnectedSelections;
