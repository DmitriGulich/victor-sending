import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProtectedRoute from './components/shared/protectedRoute';

import Admin from './views/admin';
import Home from './views/user/home';
import Login from './components/auth/login';

const App = () => {
    return ( 
        <div>
            <Switch>
                <Route path="/login" exact component={Login} />
                <ProtectedRoute path="/home" exact component={Home} />
                <ProtectedRoute path="/admin" exact component={Admin} />
                <Redirect from="/" exact to="/home" />
            </Switch>
        </div>
     );
}
 
export default App;