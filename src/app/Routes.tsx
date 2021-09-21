import React from 'react';

import { Redirect, Route, Router, Switch } from 'react-router-dom';

import { historyConfig } from './config';
import { Login } from './page/login/Login';
import { Home } from './page/home/home';

export function Routes() {
    return (
        <Router history={ historyConfig }>
            <Switch>
                <Redirect to="/login" from="/" exact/>

                <Route path="/login" component={ Login }/>
                <Route path="/home" component={ Home }/>
            </Switch>
        </Router>
    )
}
