import React from "react";

import { Login, Signup } from "components/Authentication";
import { PageNotFound, PrivateRoute, SidebarLayout } from "components/common";
import MyPosts from "components/MyPosts";
import { EditPost, NewPost, PostLists, ShowPost } from "components/Post";
import { QueryClientProvider } from "react-query";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "routes";
import queryClient from "utils/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
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
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
