import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Box, Typography, Grid } from "@material-ui/core";
import MarketType from "components/accordions/MarketType";
import { getLiveEventList, getEventById } from "redux/_actions";
import { sortMarketsByName } from "redux/selectors";

const useStyles = makeStyles({
  root: {},
  header: {
    color: "#fff",
    backgroundColor: "rgb(10,40,108)",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px"
  },
  icon: { color: "#fff" },
  detailContainer: {
    width: "100%",
    height: "200px",
    boxSizing: "border-box",
    padding: "10px",
    backgroundColor: "rgb(13,32,81)",
    color: "#fff"
  },
  eventType: { fontSize: "15px", fontWeight: "600" },
  eventDate: { fontSize: "12px", fontWeight: "400", marginLeft: "30px" },
  eventName: {
    padding: "30px 40px 0",
    fontSize: "22px",
    fontWeight: "600"
  },
  eventScores: {
    display: "flex",
    alignItems: "center",
    padding: "20px 40px 0",
    fontSize: "15px"
    // fontWeight: "600"
  },
  marketContainer: {
    margin: "10px"
  }
});

const EventPage = props => {
  const classes = useStyles();

  const { event, markets, location, getEventById } = props;

  const eventId =
    !isNaN(location.pathname.split("/")[2]) &&
    parseInt(location.pathname.split("/")[2], 10);

  useEffect(() => {
    getEventById(eventId);
  }, [eventId]);

  let content;
  console.log("event", event);

  if (Array.isArray(markets) && markets.length > 0) {
    content = markets.map((market, index) => (
      <MarketType key={`marketType_${index}`} event={event} market={market} />
    ));
  }

  const date = new Date(event.startTime).toDateString();
  const time = new Date(event.startTime).toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric"
  });
  return (
    <div className={clsx("eventPage", classes.root)}>
      <Box className={classes.detailContainer}>
        <Typography className={classes.eventType} variant="span">
          {event.typeName}
        </Typography>
        <Typography
          variant="span"
          className={classes.eventDate}
        >{`${date} ${time}`}</Typography>
        <Grid container spacing={0} className={classes.eventName}>
          <Grid item sm={5} style={{ textAlign: "right" }}>
            {event.competitors && event.competitors[0].name}
          </Grid>
          <Grid item sm={2} style={{ textAlign: "center" }}>
            V.S.
          </Grid>
          <Grid item sm={5} style={{ textAlign: "left" }}>
            {event.competitors && event.competitors[1].name}
          </Grid>
        </Grid>
        <Grid container spacing={0} className={classes.eventScores}>
          <Grid item sm={5} style={{ textAlign: "right" }}>
            Home
          </Grid>
          <Grid item sm={2} style={{ textAlign: "center", fontSize: "25px" }}>
            {event.scores && `${event.scores.home} : ${event.scores.away}`}
          </Grid>
          <Grid item sm={5} style={{ textAlign: "left" }}>
            Away
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.marketContainer}>{content}</Box>
    </div>
  );
};

EventPage.defaultProps = { event: {}, markets: {} };

EventPage.propTypes = {};

const mapStateToProps = (state, props) => {
  return {
    event: state.event,
    markets: sortMarketsByName(state, props)
  };
};

const ConnectedEventPage = connect(mapStateToProps, {
  getLiveEventList,
  getEventById
})(EventPage);

export default ConnectedEventPage;
