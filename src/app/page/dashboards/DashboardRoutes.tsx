import React, { ReactElement, useEffect } from 'react';
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import { Header} from "../../utils/components/Header";
import {Box} from "@mui/material";
import {AccountDetail} from "./account/AccountDetail";
import {ListRoute} from "./list/ListRoute";
import { UserResource } from '../../resources/UserResource';

export const DASHBOARD_PREFIX_PATH = '/dashboard';
export const DASHBOARD_LISTS_PATH = `${DASHBOARD_PREFIX_PATH}/lists`;
export const DASHBOARD_ACCOUNT_DETAIL_PATH = `${DASHBOARD_PREFIX_PATH}/account-detail`;

export function DashboardRoutes({ location: { pathname }, match: { path }}: RouteComponentProps): ReactElement {
    const canRedirectToListRoutes =
        pathname === path ||
        pathname === `${path}/`;

    useEffect(() => {
        UserResource.getCurrentUser()
            .then(usr => {
                console.log('USR: ', usr);
            });
    }, []);

    return (
        <Box sx={{ display: 'flex'}}>
            <Header />
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                {/*<DrawerHeader />*/}
                <Switch>
                    {
                        canRedirectToListRoutes && (<Redirect to={DASHBOARD_LISTS_PATH} from={path} /> )
                    }
                    <Route path={ DASHBOARD_LISTS_PATH }
                           component={ListRoute}
                    />
                    <Route path={ DASHBOARD_ACCOUNT_DETAIL_PATH }
                           component={AccountDetail}
                    />
                </Switch>
            </Box>
        </Box>
    );
}
