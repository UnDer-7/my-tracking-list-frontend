import React, {ReactElement} from "react";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import {SignInPage} from "./sign-in/SignInPage";
import {AuthService} from "../../service/AuthService";

export function AuthRoutes({ match: { path }, location: { pathname } }: RouteComponentProps): ReactElement {
    return (
        <Switch>
            {
                AuthService.isLoggedIn() && (<Redirect to="/dashboard" from={path} />)
            }
            <Route exact
                   path={ path }
                   component={ SignInPage }
           />
        </Switch>
    )
}