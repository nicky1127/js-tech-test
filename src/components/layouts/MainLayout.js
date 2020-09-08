import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  Select
} from "@material-ui/core";
import Loading from "./Loading";
import BetSlipPanel from "components/layouts/BetSlipPanel";
import { setOddsForamt } from "redux/_actions";
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
    height: "10vh",
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
  },
  formControl: {
    width: "20%"
  },
  select: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: "14px",
    textAlign: "center",
    "&:focus": {
      "& input": {
        color: "#b2ebf2"
      }
    }
  },
  label: {
    color: "#b2ebf2"
  }
}));

export const MainLayout = ({
  children,
  loading,
  isOddsDecimal,
  setOddsForamt
}) => {
  const classes = useStyles();

  const handleChange = evt => {
    setOddsForamt(evt.target.value);
  };

  return (
    <div className={clsx("mainlayout", classes.root)} data-testid="mainLayout">
      {loading && <Loading />}
      <Box className={clsx("contentWrapper", classes.contentWrapper)}>
        <Box className={clsx("appBar", classes.appBar)}>
          <Typography className={classes.text} component="span">
            {constants.links.MY_BETS}
          </Typography>
          <div className={classes.logo}></div>
          {/* <Typography className={classes.text} component="span">
            {constants.links.JOIN}
          </Typography>
          <Typography className={classes.text} component="span">
            {constants.links.LOG_IN}
          </Typography> */}
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label" className={classes.label}>
              Odds Format
            </InputLabel>
            <Select
              className={classes.select}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={isOddsDecimal}
              onChange={handleChange}
            >
              <MenuItem value={true}>Decimal</MenuItem>
              <MenuItem value={false}>Fractional</MenuItem>
            </Select>
          </FormControl>
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
  const { loading, isOddsDecimal } = state;
  return { loading, isOddsDecimal };
};

const ConnectedMainLayout = connect(mapStateToProps, { setOddsForamt })(
  MainLayout
);

export default ConnectedMainLayout;
