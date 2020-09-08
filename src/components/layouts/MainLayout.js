import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  IconButton
} from "@material-ui/core";
import { Forward } from "@material-ui/icons";
import Loading from "./Loading";
import BetSlipPanel from "components/layouts/BetSlipPanel";
import { setOddsFormat } from "redux/_actions";
import labels from "constants/labels";

const constants = labels.MainLayout;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    position: "relative"
  },
  contentWrapper: {
    width: "77%"
  },
  appBar: {
    height: "10vh",
    padding: "0 1.5rem",
    backgroundColor: "rgb(21,63,142)",
    display: "flex",
    alignItems: "center"
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
  },
  arrowIcon: {
    transform: "rotate(180deg)",
    color: "#fff"
  },
  logo: {
    flex: "20 20 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  logoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: " #fff",
    width: "80px",
    height: "40px",
    fontSize: "20px",
    backgroundImage: 'linear-gradient(rgb(223,52,66),rgb(183,0,6))',
    // backgroundColor: "rgb(183,0,6)",
    borderRadius: "2px"
  }
}));

export const MainLayout = ({
  children,
  loading,
  isOddsDecimal,
  setOddsFormat,
  path
}) => {
  const classes = useStyles();

  const [redirect, setRedirect] = useState(false);

  const handleChange = evt => {
    setOddsFormat(evt.target.value);
  };

  const onClickBack = () => {
    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to={"/"} />;
  }

  let arrowDom;

  if (path !== "/") {
    arrowDom = (
      <IconButton
        aria-label="back to live events list page"
        onClick={onClickBack}
      >
        <Forward className={classes.arrowIcon} />
      </IconButton>
    );
  }

  return (
    <div className={clsx("mainlayout", classes.root)} data-testid="mainLayout">
      {loading && <Loading />}
      <Box className={clsx("contentWrapper", classes.contentWrapper)}>
        <Box className={clsx("appBar", classes.appBar)}>
          {arrowDom}
          <Typography className={classes.text} component="span">
            {constants.links.MY_BETS}
          </Typography>
          <div className={classes.logo}>
            <Box className={classes.logoItem}>Let's Bet</Box>
          </div>
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

const ConnectedMainLayout = connect(mapStateToProps, { setOddsFormat })(
  MainLayout
);

export default ConnectedMainLayout;
