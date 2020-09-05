import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EventListPage from "pages/EventListPage";
import EventPage from "pages/EventPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={EventListPage} />
        <Route path="/events/:eventId" component={EventPage} />
      </Switch>
    </Router>
  );
}

export default App;
