import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import Loading from "./Loading";
import BetSlipPanel from "components/layouts/BetSlipPanel";
import labels from "constants/labels";

const constants = labels.MainLayout;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    position: "relative"
  },
  contentWrapper: {
    width: "78%"
  },
  appBar: {
    height: "8vh",
    padding: "0 1.5rem",
    backgroundColor: "rgb(21,63,142)",
    display: "flex",
    alignItems: "center"
  },
  logo: {
    flex: "20 20 auto"
  },
  text: {
    color: "#fff",
    fontSize: "12px",
    padding: "0 10px",
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

export const MainLayout = ({ children, loading }) => {
  const classes = useStyles();

  return (
    <div className={clsx("mainlayout", classes.root)}>
      {loading && <Loading />}
      <Box className={clsx("contentWrapper", classes.contentWrapper)}>
        <Box className={clsx("appBar", classes.appBar)}>
          <Typography className={classes.text} component="span">
            {constants.links.MY_BETS}
          </Typography>
          <div className={classes.logo}></div>
          <Typography className={classes.text} component="span">
            {constants.links.JOIN}
          </Typography>
          <Typography className={classes.text} component="span">
            {constants.links.LOG_IN}
          </Typography>
        </Box>
        {children}
      </Box>
      <BetSlipPanel />
    </div>
  );
};

MainLayout.defaultProps = {};

MainLayout.propTypes = {};

const mapStateToProps = state => {
  const { loading } = state;
  return { loading };
};

const ConnectedMainLayout = connect(mapStateToProps)(MainLayout);

export default ConnectedMainLayout;
