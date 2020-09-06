import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EventListPage from "pages/EventListPage";
import EventPage from "pages/EventPage";
import MainLayout from "components/layouts/MainLayout";

function App() {
  return (
    <MainLayout>
      <Router>
        <Switch>
          <Route exact path="/" component={EventListPage} />
          <Route path="/events/:eventId" component={EventPage} />
          {/* <Route exact path="/" component={EventPage} /> */}
        </Switch>
      </Router>
    </MainLayout>
  );
}

export default App;
