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
import { ExpandMore } from "@material-ui/icons";
import { getOutcomeListByIds } from "redux/_actions";
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
    },
    
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
  }
}));

export const MarketType = props => {
  const classes = useStyles();
  const { event, market, isOddsDecimal, getOutcomeListByIds } = props;
  const [expanded, setExpanded] = useState(false);

  const rows =
    market.outcomeList &&
    Object.values(market.outcomeList).map(outcome => ({
      status: outcome.status,
      name: outcome.name,
      price: outcome.price
    }));

  const onClickBtn = () => {
    setExpanded(!expanded);
    if (!Object.values(market.outcomeList).length) {
      getOutcomeListByIds(market.outcomes);
    }
  };

  return (
    <div className={clsx("marketType", classes.root)}>
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
                  rows.map(row => {
                    const price = isOddsDecimal
                      ? row.price.decimal
                      : `${row.price.num}/${row.price.den}`;
                    return (
                      <TableRow key={row.name}>
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
                        ) : (
                          <TableCell
                            className={classes.normalCell}
                            align="center"
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
  const { isOddsDecimal } = state;
  return { isOddsDecimal };
};

const ConnectedMarketType = connect(mapStateToProps, { getOutcomeListByIds })(
  MarketType
);

export default ConnectedMarketType;
