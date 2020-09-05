import React, { Children } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import BetSlipPanel from "components/layouts/BetSlipPanel";
import constants from "constants";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex"
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

export const MainLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={clsx("mainlayout", classes.root)}>
      <Box className={clsx("contentWrapper", classes.contentWrapper)}>
        <Box className={clsx("appBar", classes.appBar)}>
          <Typography className={classes.text} component="span">
            My Bets
          </Typography>
          <div className={classes.logo}></div>
          <Typography className={classes.text} component="span">
            Join
          </Typography>
          <Typography className={classes.text} component="span">
            Log in
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
  const { test } = state;
  return {};
};

const ConnectedMainLayout = connect(mapStateToProps)(MainLayout);

export default ConnectedMainLayout;
