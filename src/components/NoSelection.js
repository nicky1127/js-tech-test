import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import labels from "constants/labels";

const constants = labels.NoSelecttion;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: "30px 0"
  },
  noSelectText: { fontSize: "14px", textAlign: "center" },
  optionBox: {
    color: "#444",
    backgroundColor: "#fff",
    display: "flex",
    width: "85%",
    height: "35px",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px auto",
    border: "1px solid rgb(180,191,211)",
    borderRadius: "5px",
    "&:hover": {
      color: "#222",
      border: "1px solid rgb(144,157,180)",
      backgroundColor: "rgb(239,244,252)"
    }
  }
}));

export const NoSelection = () => {
  const classes = useStyles();
  const items = constants.options;
  return (
    <div className={classes.root}>
      <Typography className={classes.noSelectText}>
        {constants.description}
      </Typography>
      {items.map(item => (
        <Box className={classes.optionBox}>
          <Typography className={classes.noSelectSubText}>{item}</Typography>
        </Box>
      ))}
    </div>
  );
};

NoSelection.defaultProps = {};

NoSelection.propTypes = {};

export default NoSelection;
