import React, { useState } from "react";
import PropTypes from "prop-types";
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
import { ExpandMore, CheckCircleRounded } from "@material-ui/icons";
import {
  getOutcomeListByIds,
  addSelection,
  removeSelection
} from "redux/_actions";
import labels from "constants/labels";

const constants = labels.MarketType;

const useStyles = makeStyles(theme => ({
  root: {
    margin: "10px"
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
  },
  table: {
    "& th": {
      border: "1px solid rgb(179,191,211)"
    },
    "& td": {
      border: "1px solid rgb(179,191,211)"
    }
  },
  suspendedCell: {
    backgroundColor: "rgb(205,205,206)",
    color: "rgb(120,120,120)",
    fontWeight: "600"
  },
  normalCell: {
    color: "rgb(217,34,49)",
    "&:hover": {
      backgroundColor: "rgb(239,244,252)",
      cursor: "pointer"
    }
  },
  selectedCell: {
    color: "rgb(88,150,226)",
    backgroundColor: "rgb(225,232,243)",
    "&:hover": {
      backgroundColor: "rgb(239,244,252)",
      cursor: "pointer"
    }
  }
}));

export const MarketType = props => {
  const classes = useStyles();
  const {
    event,
    market,
    isOddsDecimal,
    getOutcomeListByIds,
    addSelection,
    removeSelection,
    selections
  } = props;
  const [expanded, setExpanded] = useState(false);

  const rows =
    market.outcomeList &&
    Object.values(market.outcomeList).map(outcome => ({
      ...outcome,
      marketName: market.name,
      eventName: event.name
    }));

  const onClickBtn = () => {
    setExpanded(!expanded);
    if (!Object.values(market.outcomeList).length) {
      getOutcomeListByIds(market.outcomes);
    }
  };

  const onClickSelectedCell = outcome => {
    removeSelection(outcome.outcomeId);
  };

  const onClickNormalCell = outcome => {
    addSelection(outcome);
  };

  return (
    <div className={clsx("marketType", classes.root)} data-testid="marketType">
      <Accordion expanded={expanded}>
        <AccordionSummary
          className={classes.header}
          expandIcon={<ExpandMore fontSize="large" className={classes.icon} />}
          onClick={onClickBtn}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{market.name}</Typography>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.details }}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {rows &&
                  rows.map((row, idx) => {
                    const isSelected = selections.find(
                      selection => selection.outcomeId === row.outcomeId
                    );
                    const price = isOddsDecimal
                      ? row.price.decimal
                      : `${row.price.num}/${row.price.den}`;
                    return (
                      <TableRow key={`${row.name}_${idx}`}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        {row.status.suspended ? (
                          <TableCell
                            className={classes.suspendedCell}
                            align="center"
                          >
                            Susp
                          </TableCell>
                        ) : isSelected ? (
                          <TableCell
                            className={classes.selectedCell}
                            align="center"
                            onClick={() => onClickSelectedCell(row)}
                          >
                            <CheckCircleRounded fontSize="small" />
                          </TableCell>
                        ) : (
                          <TableCell
                            className={classes.normalCell}
                            align="center"
                            onClick={() => onClickNormalCell(row)}
                          >
                            {price}
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

MarketType.defaultProps = { market: {} };

MarketType.propTypes = {};

const mapStateToProps = state => {
  const { isOddsDecimal, selections } = state;
  return { isOddsDecimal, selections };
};

const ConnectedMarketType = connect(mapStateToProps, {
  getOutcomeListByIds,
  removeSelection,
  addSelection
})(MarketType);

export default ConnectedMarketType;
