import React, { ReactElement } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AUTH_PREFIX_PATH } from '../../page/auth/AuthRoutes';
import { AuthService } from '../../service/AuthService';

export function ProtectRoute(props: RouteProps): ReactElement {
    if (AuthService.isLoggedIn()) {
        return (
            <Route { ...props } />
        )
    }

    return (
        <Redirect to={ AUTH_PREFIX_PATH }/>
    );
}
