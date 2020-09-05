import React from "react";
import logo from "../logo.svg";
import "../App.css";
import { connect } from "react-redux";
import { getLiveEventList } from "redux/_actions";

const EventListPage = props => {
  props.getLiveEventList(false);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

EventListPage.defaultProps = {};

EventListPage.propTypes = {};

// const mapStateToProps = state => {
//   const {} = state;
//   return {};
// };

const ConnectedEventListPage = connect(null, { getLiveEventList })(
  EventListPage
);

export default ConnectedEventListPage;
