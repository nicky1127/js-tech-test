import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(6,48,133)",
    color: "#fff",
    width: "70%",
    height: "30px",
    borderRadius: "5px"
  }
});

const ScoreTag = props => {
  const classes = useStyles();
  const { scores } = props;
  return (
    <div
      className={clsx("score", classes.root)}
      data-testid="scoreTag"
    >{`${scores.home}-${scores.away}`}</div>
  );
};

ScoreTag.defaultProps = { scores: {} };

ScoreTag.propTypes = {
  scores: PropTypes.shape({
    home: PropTypes.number,
    away: PropTypes.number
  })
};

export default ScoreTag;
