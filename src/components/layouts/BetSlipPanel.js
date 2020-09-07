import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import NoSelection from "components/units/NoSelection";
import Selections from "components/accordions/Selections";
import labels from "constants/labels";

const constants = labels.BetSlipPanel;

const useStyles = makeStyles(theme => ({
  root: {
    width: "23%",
    height: "100vh",
    position: "fixed",
    overflowY: "scroll",
    right: "0",
    backgroundColor: props =>
      props.selections.length > 0 ? "#fff" : "rgb(239,244,252)"
  },
  header: {
    boxSizing: "border-box",
    height: "10vh",
    padding: "0 8%",
    width: "100%",
    backgroundColor: "rgb(18,44,108)",
    display: "flex",
    alignItems: "center"
  },
  panelBody: {
    width: "100%",
    height: "85vh",
    border: props =>
      props.selections.length > 0 ? "1px solid rgb(165,175,194)" : "none"
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

export const BetSlipPanel = ({ children, selections }) => {
  const classes = useStyles({ selections });

  return (
    <div className={clsx("betSlipPanel", classes.root)}>
      <Box className={classes.header}>
        <Box className={classes.numFlag}>{selections.length}</Box>
        <Typography className={classes.headerText}>
          {constants.header}
        </Typography>
      </Box>
      <Box className={classes.panelBody}>
        {selections.length > 0 ? <Selections /> : <NoSelection />}
      </Box>
    </div>
  );
};

BetSlipPanel.defaultProps = {};

BetSlipPanel.propTypes = {};

const mapStateToProps = state => {
  const { selections } = state;
  return { selections };
};

const ConnectedBetSlipPanel = connect(mapStateToProps)(BetSlipPanel);

export default ConnectedBetSlipPanel;
