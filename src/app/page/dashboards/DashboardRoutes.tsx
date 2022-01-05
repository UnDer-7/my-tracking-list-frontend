import React, {ReactElement} from "react";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import {DrawerHeader, Header} from "../../components/Header";
import {Box} from "@mui/material";
import {AccountDetail} from "./account/AccountDetail";
import {ListRoute} from "./list/ListRoute";

export function DashboardRoutes({ location: { pathname }, match: { path }}: RouteComponentProps): ReactElement {
    const canRedirectToListRoutes =
        pathname === path ||
        pathname === `${path}/`;

    return (
        <Box sx={{ display: 'flex'}}>
            <Header />
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader />
                <Switch>
                    {
                        canRedirectToListRoutes && (<Redirect to="/dashboard/lists" from={path} /> )
                    }
                    <Route path="/dashboard/lists"
                           component={ListRoute}
                    />
                    <Route path="/dashboard/account-detail"
                           component={AccountDetail}
                    />
                </Switch>
            </Box>
        </Box>
    )
}