import React from 'react';

import { Redirect, Route, Router, Switch } from 'react-router-dom';

import { historyConfig } from './config';
import { AUTH_PREFIX_PATH, AuthRoutes } from './page/auth/AuthRoutes';
import { DASHBOARD_PREFIX_PATH, DashboardRoutes } from './page/dashboards/DashboardRoutes';
import { ProtectRoute } from './utils/components/ProtectRoute';
import { useNotifier } from './utils/hooks/useNotifier';

export function Routes() {
    useNotifier();

    return (
        <Router history={ historyConfig }>
            <Switch>
                <Redirect to={ DASHBOARD_PREFIX_PATH } from="/" exact/>
                <Route path={ AUTH_PREFIX_PATH } component={ AuthRoutes }/>
                <ProtectRoute path={ DASHBOARD_PREFIX_PATH } component={ DashboardRoutes }/>
            </Switch>
        </Router>
    )
}
