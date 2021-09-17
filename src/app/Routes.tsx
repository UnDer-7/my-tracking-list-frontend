import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { Temp } from './pages/login/Temp';

export function Routes() {
    return (
        <Switch>
            <Redirect to="/login" from="/" exact/>

            <Route path="/login" component={Login} exact/>
            <Route path="/tmp" component={Temp} exact/>
        </Switch>
    )
}
