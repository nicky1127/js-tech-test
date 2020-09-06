import React, { Children } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import NoSelection from "components/units/NoSelection";
import labels from "constants/labels";

const constants = labels.BetSlipPanel;

const useStyles = makeStyles(theme => ({
  root: {
    width: "24%",
    backgroundColor: "rgb(239,244,252)"
  },
  header: {
    boxSizing: "border-box",
    height: "8vh",
    padding: "0 8%",
    width: "100%",
    backgroundColor: "rgb(18,44,108)",
    display: "flex",
    alignItems: "center"
  },
  numFlag: {
    width: "30px",
    height: "30px",
    color: "#fff",
    textAlign: "center",
    lineHeight: "30px",
    backgroundColor: "rgb(7,6,82)",
    borderRadius: "50%"
  },
  headerText: {
    color: "#fff",
    margin: " 0 15px"
  }
}));

export const BetSlipPanel = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={clsx("betSlipPanel", classes.root)}>
      <Box className={classes.header}>
        <Box className={classes.numFlag}>3</Box>
        <Typography className={classes.headerText}>
          {constants.header}
        </Typography>
      </Box>
      <NoSelection />
    </div>
  );
};

BetSlipPanel.defaultProps = {};

BetSlipPanel.propTypes = {};

const mapStateToProps = state => {
  const { test } = state;
  return {};
};

const ConnectedBetSlipPanel = connect(mapStateToProps)(BetSlipPanel);

export default ConnectedBetSlipPanel;
