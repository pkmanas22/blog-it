import React from "react";

import { Login, Signup } from "components/Authentication";
import { PageNotFound, PrivateRoute, SidebarLayout } from "components/common";
import MyPosts from "components/MyPosts";
import EditPost from "components/Post/Edit";
import PostLists from "components/Post/Lists";
import NewPost from "components/Post/New";
import ShowPost from "components/Post/Show";
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
              component={PostLists}
              path={routes.posts.index}
            />
            <PrivateRoute
              exact
              component={NewPost}
              path={routes.posts.create}
            />
            <PrivateRoute exact component={MyPosts} path={routes.myPosts} />
            <PrivateRoute exact component={ShowPost} path={routes.posts.show} />
            <PrivateRoute exact component={EditPost} path={routes.posts.edit} />
            <Redirect exact from={routes.root} to={routes.posts.index} />
            <Route component={PageNotFound} path={routes.fallback} />
          </Switch>
        </SidebarLayout>
      </Switch>
    </Router>
  </QueryClientProvider>
);

export default App;
