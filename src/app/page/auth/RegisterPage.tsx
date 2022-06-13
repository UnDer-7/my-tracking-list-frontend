import React, { ReactElement } from 'react';
import { Button, Grid, Link, Typography } from '@mui/material';
import { GoogleIcon } from '../../components/Icons';
import { useRoutes } from '../../hooks/useRoutes';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { AuthService } from '../../service/AuthService';

export function RegisterPage(): ReactElement {
    const { goToSignIn } = useRoutes();
    const login = useGoogleLogin({
        onSuccess,
        onError,
        flow: 'auth-code',
    });

    function onSuccess(res: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>) {
        res.code
    }

    function onError(res: any) {
        console.log("Err: ", res);
    }

    return (
        <Grid item container spacing={2} direction="row" justifyContent="center" xs={12}>
            <Grid container justifyContent="center" alignItems="center" item xs={12}>
                <Typography variant="h3">New Account</Typography>
            </Grid>
            <Grid item textAlign="center">
                <Button
                    size="medium"
                    variant="outlined"
                    startIcon={ <GoogleIcon />}
                    onClick={login}>
                    Register with Google
                </Button>
                <br/>
                <br/>
                <Typography variant="caption">Already have an account? <Link underline="hover" onClick={goToSignIn}>Sign in</Link></Typography>
            </Grid>
        </Grid>
    );
}
