import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({path, component}) => {
    const token = localStorage.getItem('token');
    return token !== null ? <Route path={path} exact component={component} /> : <Redirect to='/login' />;
}

export default ProtectedRoute;