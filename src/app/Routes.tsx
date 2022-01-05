import React from 'react';

import { Redirect, Route, Router, Switch } from 'react-router-dom';

import { historyConfig } from './config';
import { AuthRoutes} from "./page/auth/AuthRoutes";
import {DashboardRoutes} from "./page/dashboards/DashboardRoutes";
import {ProtectRoute} from "./components/ProtectRoute";

export function Routes() {
    return (
        <Router history={ historyConfig }>
            <Switch>
                <Redirect to="/dashboard" from="/" exact/>
                <Route path="/auth" component={ AuthRoutes } />
                <ProtectRoute path="/dashboard" component={ DashboardRoutes } />
            </Switch>
        </Router>
    )
}
