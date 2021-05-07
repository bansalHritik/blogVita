import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const UnauthenticatedRoute = ({ component, redirectTo, ...extraProps }) => {
  const auth = useSelector((state) => state.auth);
  return !auth ? (
    <Route {...extraProps} component={component} />
  ) : (
    <Redirect to={redirectTo} />
  );
};
export default UnauthenticatedRoute;
