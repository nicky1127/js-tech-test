import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import { ExpandMore, Clear } from "@material-ui/icons";
import ScoreTag from "components/units/ScoreTag";
import { removeSelection } from "redux/_actions";
import labels from "constants/labels";

const constants = labels.SelectionUnit;

const useStyles = makeStyles(theme => ({
  selectionUnit: {
    padding: "8px",
    backgroundColor: "rgb(239,244,252)",
    paddingBottom: "15px",
    border: "1px solid rgb(179,191,211)"
  },
  selectionHeader: { fontWeight: "600", fontSize: "15px" },
  event: {
    padding: "10px 0",
    fontSize: "12px",
    width: "80%"
  },
  crossIcon: {
    display: "flex",
    alignItems: "flex-start",
    justifuContent: "flex-end"
  }
}));

export const SelectionUnit = props => {
  const classes = useStyles();
  const { isOddsDecimal, outcome, removeSelection } = props;

  const price =
    outcome &&
    outcome.price &&
    (isOddsDecimal
      ? outcome.price.decimal
      : `${outcome.price.num}/${outcome.price.den}`);

  const onClickBtn = () => {
    removeSelection(outcome.outcomeId);
  };

  return (
    <Box className={classes.selectionUnit} data-testid="selectionUnit">
      <Grid container spacing={0}>
        <Grid item sm={10} className={classes.selectionHeader}>
          {`${outcome.name} @ `}
          <span style={{ color: "rgb(217,34,49)", fontWeight: "400" }}>
            {price}
          </span>
        </Grid>
        <Grid item sm={2} className={classes.crossIcon}>
          <Clear onClick={onClickBtn} />
        </Grid>
        <Grid item sm={12} className={classes.event}>
          {`${outcome.eventName} - ${outcome.marketName}`}
        </Grid>
      </Grid>
    </Box>
  );
};

SelectionUnit.defaultProps = { outcome: {} };

SelectionUnit.propTypes = {};

const mapStateToProps = state => {
  const { isOddsDecimal } = state;
  return { isOddsDecimal };
};

const ConnectedSelectionUnit = connect(mapStateToProps, {
  removeSelection
})(SelectionUnit);

export default ConnectedSelectionUnit;
