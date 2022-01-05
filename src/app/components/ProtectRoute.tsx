import React, {ReactElement} from "react";
import {Redirect, Route, RouteProps} from "react-router-dom";
import {AuthService} from "../service/AuthService";

export function ProtectRoute(props: RouteProps): ReactElement {
    if (AuthService.isLoggedIn()) {
        return (
            <Route {...props} />
        )
    }

    return (
        <Redirect to="/auth" />
    );
}
