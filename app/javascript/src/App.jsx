import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Sidebar } from "./components/common";
import Home from "./components/Home";
import routes from "./routes";

const App = () => (
  <Router>
    <div className="neeto-ui-bg-gray-100 flex h-screen w-screen">
      <Sidebar />
      <div className="min-h-0 flex-1">
        <Switch>
          <Route exact component={Home} path={routes.root} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
