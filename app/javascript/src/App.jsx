import React from "react";

import BlogPosts from "components/BlogPosts";
import { Sidebar } from "components/common";
import CreateNewPost from "components/CreateNewPost";
import { QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "src/routes";
import queryClient from "utils/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <ToastContainer />
      <div className="neeto-ui-bg-white flex h-screen w-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-12">
          <Switch>
            <Route exact component={BlogPosts} path={routes.blogs.index} />
            <Route exact component={CreateNewPost} path={routes.blogs.create} />
            <Redirect from={routes.root} to={routes.blogs.index} />
          </Switch>
        </div>
      </div>
    </Router>
  </QueryClientProvider>
);

export default App;
