import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from "@material-ui/core";
import { ExpandMore, Clear } from "@material-ui/icons";
import SelectionUnit from "components/units/SelectionUnit";
import { getEventById, removeAllSelection } from "redux/_actions";
import labels from "constants/labels";

const constants = labels.Selections;

const useStyles = makeStyles(theme => ({
  root: {
    width: "95%",
    maxHeight: "95%",
    overflowY: "scroll",
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
  },
  //remove all selections
  rmAll: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "500",
    width: "60%",
    fontSize: "12px",
    height: "30px",
    padding: "4px",
    border: "1px solid rgb(179,191,211)",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "rgb(239,244,252)",
      cursor: "pointer"
    }
  }
}));

export const Selections = props => {
  const classes = useStyles();
  const { selections, removeAllSelection } = props;
  const [expanded, setExpanded] = useState(true);

  let content;
  if (selections.length > 0) {
    content = selections.map(selection => (
      <SelectionUnit outcome={selection} />
    ));
  }

  const onClickRemoveAll = () => {
    removeAllSelection();
  };

  return (
    <div className={clsx("Selections", classes.root)} data-testid="selections">
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
      <Box className={classes.rmAll} onClick={onClickRemoveAll}>
        <Clear fontSize="small" />
        Remove all selections
      </Box>
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
  getEventById,
  removeAllSelection
})(Selections);

export default ConnectedSelections;
