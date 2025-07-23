import React from "react";

import { Login, Signup } from "components/Authentication";
import EditBlog from "components/Blog/Edit";
import BlogLists from "components/Blog/Lists";
import NewBlog from "components/Blog/New";
import ShowBlog from "components/Blog/Show";
import { PageNotFound, PrivateRoute, SidebarLayout } from "components/common";
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
              component={NewBlog}
              path={routes.blogs.create}
            />
            <PrivateRoute exact component={ShowBlog} path={routes.blogs.show} />
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
