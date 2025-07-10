import React from "react";

import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import BlogPosts from "./components/BlogPosts";
import { Sidebar } from "./components/common";
import routes from "./routes";

const App = () => (
  <QueryClientProvider>
    <Router>
      <div className="neeto-ui-bg-white flex h-screen w-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-12">
          <Switch>
            <Route exact component={BlogPosts} path={routes.root} />
          </Switch>
        </div>
      </div>
    </Router>
  </QueryClientProvider>
);

export default App;
