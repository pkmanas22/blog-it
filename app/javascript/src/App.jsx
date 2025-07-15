import React from "react";

import Blog from "components/Blog";
import BlogLists from "components/BlogLists";
import Categories from "components/Categories";
import { PageNotFound, Sidebar } from "components/common";
import CreateNewPost from "components/CreateNewPost";
import { QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "routes";
import queryClient from "utils/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <ToastContainer />
      <div className="neeto-ui-bg-white flex h-screen w-screen">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <Switch>
            <Route exact component={BlogLists} path={routes.blogs.index} />
            <Route exact component={CreateNewPost} path={routes.blogs.create} />
            <Route exact component={Blog} path={routes.blogs.show} />
            <Route
              exact
              component={Categories}
              path={routes.categories.index}
            />
            <Redirect exact from={routes.root} to={routes.blogs.index} />
            <Route component={PageNotFound} path="*" />
          </Switch>
        </div>
      </div>
    </Router>
  </QueryClientProvider>
);

export default App;
