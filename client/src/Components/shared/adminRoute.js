import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

const AdminRoute = ({ path, component }) => {
  const { user } = useSelector(state => state.auth);

  return user.role === 'admin' ? <Route path={path} exact component={component} /> : <Redirect to='/send' />;
};

export default AdminRoute;