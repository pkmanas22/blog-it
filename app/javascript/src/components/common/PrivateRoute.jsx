import React from "react";

import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import useAuthStore from "stores/useAuthStore";

const PrivateRoute = ({
  component: Component,
  path,
  redirectRoute = "/login",
  ...props
}) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: redirectRoute,
          from: props.location,
        }}
      />
    );
  }

  return <Route component={Component} path={path} {...props} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  redirectRoute: PropTypes.string,
  location: PropTypes.object,
};

export default PrivateRoute;
