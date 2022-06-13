import React, {ReactElement} from "react";
import {Redirect, Route, RouteProps} from "react-router-dom";
import { AUTH_PREFIX_PATH } from '../page/auth/AuthRoutes';

export function ProtectRoute(props: RouteProps): ReactElement {
    // if (AuthService.isLoggedIn()) {
    if (false) {
        return (
            <Route {...props} />
        )
    }

    return (
        <Redirect to={AUTH_PREFIX_PATH} />
    );
}
