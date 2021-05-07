import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const AuthenticatedRoute = ({ component, redirectTo, ...extraProps }) => {
  const auth = useSelector((state) => state.auth);
  return auth ? (
    <Route component={component} {...extraProps} />
  ) : (
    <Redirect to={redirectTo} />
  );
};

export default AuthenticatedRoute;
