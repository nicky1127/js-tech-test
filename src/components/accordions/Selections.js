import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import SelectionUnit from "components/units/SelectionUnit";
import { getEventById } from "redux/_actions";
import labels from "constants/labels";

const constants = labels.Selections;

const useStyles = makeStyles(theme => ({
  root: {
    width: "95%",
    margin: "10px auto"
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
}));

export const Selections = props => {
  const classes = useStyles();
  const { selections } = props;
  const [expanded, setExpanded] = useState(true);

  let content;
  if (selections.length > 0) {
    content = selections.map(selection => (
      <SelectionUnit outcome={selection} />
    ));
  }

  return (
    <div className={clsx("Selections", classes.root)}>
      <Accordion expanded={expanded}>
        <AccordionSummary
          className={classes.header}
          onClick={() => setExpanded(!expanded)}
          expandIcon={<ExpandMore fontSize="small" className={classes.icon} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{`Singles`}</Typography>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.details }}>
          {content}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

Selections.defaultProps = { selections: [] };

Selections.propTypes = { selections: PropTypes.array };

const mapStateToProps = state => {
  const { selections, isOddsDecimal } = state;
  return { selections, isOddsDecimal };
};

const ConnectedSelections = connect(mapStateToProps, {
  getEventById
})(Selections);

export default ConnectedSelections;
