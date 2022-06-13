import React, {ReactElement} from "react";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import {AuthPage} from "./AuthPage";
import { Button, Grid, Paper, Typography } from '@mui/material';
import { RegisterPage } from './RegisterPage';
import { SignInPage } from './SignInPage';

export const AUTH_PREFIX_PATH = '/auth';
export const AUTH_REGISTER_PATH = `${AUTH_PREFIX_PATH}/register`;
export const AUTH_SIGN_IN_PATH = `${AUTH_PREFIX_PATH}/sign-in`;

export function AuthRoutes({ match: { path }, location: { pathname } }: RouteComponentProps): ReactElement {
    return (
        <Grid container component="main" sx={{'height': '100vh'}}>
            <Grid item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                      backgroundImage: 'url(https://source.unsplash.com/random)',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                  }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square container>
                <Switch>
                    {
                        // AuthService.isLoggedIn() && (<Redirect to="/dashboard" from={path} />)
                    }
                    <Route exact
                           path={ AUTH_PREFIX_PATH }
                           component={ AuthPage }
                    />
                    <Route exact
                           path={ AUTH_REGISTER_PATH }
                           component={RegisterPage}
                   />
                    <Route exact
                           path={ AUTH_SIGN_IN_PATH }
                           component={SignInPage}
                    />
                </Switch>
            </Grid>
        </Grid>
    )
}
