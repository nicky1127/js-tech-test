import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress
} from "@material-ui/core";
import labels from "constants/labels";

const constants = labels.Loading;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "300",
    backgroundColor: "rgba(100,100,100,0.7)",
    display: "flex",
    justifyContent: "center"
  },
  progress: {
    position: "absolute",
    top: "50vh"
  }
}));

export const Loading = props => {
  const classes = useStyles();

  return (
    <div className={clsx("loading", classes.root)}>
      <CircularProgress className={classes.progress} />
    </div>
  );
};

export default Loading;
