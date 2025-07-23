import React from "react";

import { Login, Signup } from "components/Authentication";
import Blog from "components/Blog";
import EditBlog from "components/Blog/Edit";
import BlogLists from "components/BlogLists";
import { PageNotFound, PrivateRoute, SidebarLayout } from "components/common";
import NewPost from "components/NewPost";
import { QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "routes";
import queryClient from "utils/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={Login} path={routes.auth.login} />
        <Route exact component={Signup} path={routes.auth.signup} />
        <SidebarLayout>
          <Switch>
            <PrivateRoute
              exact
              component={BlogLists}
              path={routes.blogs.index}
            />
            <PrivateRoute
              exact
              component={NewPost}
              path={routes.blogs.create}
            />
            <PrivateRoute exact component={Blog} path={routes.blogs.show} />
            <PrivateRoute exact component={EditBlog} path={routes.blogs.edit} />
            <Redirect exact from={routes.root} to={routes.blogs.index} />
            <Route component={PageNotFound} path={routes.fallback} />
          </Switch>
        </SidebarLayout>
      </Switch>
    </Router>
  </QueryClientProvider>
);

export default App;
