import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import MarketType from "components/accordions/MarketType";
import { getLiveEventList, getEventById } from "redux/_actions";
import { sortEventsByTime, groupEventsByType } from "redux/selectors";


const useStyles = makeStyles({
  root: {
    margin: "10px"
  },
  header: {
    color: "#fff",
    backgroundColor: "rgb(10,40,108)",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px"
  },
  icon: { color: "#fff" },
  details: {
    padding: 0,
    flexDirection: "column"
  }
});

const EventPage = props => {
  const classes = useStyles();

  const { event, markets } = props;

  let content;

  if (Array.isArray(markets) && markets.length > 0) {
    content = markets.map((market, index) => (
      <MarketType key={`marketType_${index}`} event={event} market={market} />
    ));
  }

  useEffect(() => {
    props.getLiveEventList(false);
    props.getEventById(21249945);
  }, []);

  return (
    <div className={clsx("eventPage", classes.root)}>
      {content}
    </div>
  );
};

EventPage.defaultProps = { event: {}, markets: {} };

EventPage.propTypes = {};

const mapStateToProps = (state, props) => {
  return {
    event: state.event,
    markets: Object.values(state.markets)
  };
};

const ConnectedEventPage = connect(mapStateToProps, {
  getLiveEventList,
  getEventById
})(EventPage);

export default ConnectedEventPage;
