import React from 'react';

import { Redirect, Route, Router, Switch } from 'react-router-dom';

import { historyConfig } from './config';
import { AUTH_PREFIX_PATH, AuthRoutes } from './page/auth/AuthRoutes';
import { DashboardRoutes } from './page/dashboards/DashboardRoutes';
import { ProtectRoute } from './utils/components/ProtectRoute';
import { useNotifier } from './utils/hooks/useNotifier';

export function Routes() {
    useNotifier();

    return (
        <Router history={ historyConfig }>
            <Switch>
                <Redirect to="/dashboard" from="/" exact/>
                <Route path={ AUTH_PREFIX_PATH } component={ AuthRoutes }/>
                <ProtectRoute path="/dashboard" component={ DashboardRoutes }/>
            </Switch>
        </Router>
    )
}
