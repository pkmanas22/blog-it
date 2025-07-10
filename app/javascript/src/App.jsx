import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Home from "./components/Home";
import routes from "./routes";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={Home} path={routes.root} />
    </Switch>
  </Router>
);

export default App;
