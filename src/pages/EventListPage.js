import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { getLiveEventList } from "redux/_actions";
import { sortEventsByTime, groupEventsByType } from "redux/selectors";

import EventType from "components/accordions/EventType";

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

const EventListPage = props => {
  const classes = useStyles();

  const { eventGroup, getLiveEventList } = props;
  const [expanded, setExpanded] = useState(true);

  let content;

  if (Array.isArray(eventGroup) && eventGroup.length > 0) {
    content = eventGroup.map((group, index) => (
      <EventType key={`eventType-${index}`} group={group} />
    ));
  }

  useEffect(() => {
    getLiveEventList(true);
  }, []);

  return (
    <div className={clsx("eventListPage", classes.root)} data-testid='eventListPage'>
      <Accordion expanded={expanded}>
        <AccordionSummary
          className={classes.header}
          expandIcon={<ExpandMore fontSize="large" className={classes.icon} />}
          onClick={() => setExpanded(!expanded)}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Football</Typography>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.details }}>
          {content}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

EventListPage.defaultProps = { liveEvents: [] };

EventListPage.propTypes = { liveEvents: PropTypes.array };

const mapStateToProps = (state, props) => {
  return {
    liveEvents: sortEventsByTime(state, props),
    eventGroup: groupEventsByType(state, props)
  };
};

const ConnectedEventListPage = connect(mapStateToProps, {
  getLiveEventList
})(EventListPage);

export default ConnectedEventListPage;
