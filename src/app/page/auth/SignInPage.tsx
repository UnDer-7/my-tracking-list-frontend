import React, { ReactElement } from 'react';
import { Button, Grid, Link, Typography } from '@mui/material';
import { GoogleIcon } from '../../components/Icons';
import { useRoutes } from '../../hooks/useRoutes';

export function SignInPage(): ReactElement {
    const { goToRegister } = useRoutes();

    return (
        <Grid item container spacing={2} direction="row" justifyContent="center" xs={12}>
            <Grid container justifyContent="center" alignItems="center" item xs={12}>
                <Typography variant="h3">Sign In</Typography>
            </Grid>
            <Grid item textAlign="center">
                <Button
                    size="medium"
                    variant="outlined"
                    startIcon={ <GoogleIcon />}
                    onClick={() => {}}>
                    Sign In with Google
                </Button>
                <br/>
                <br/>
                <Typography variant="caption">Don’t have an account? <Link underline="hover" onClick={goToRegister}>Sign Up</Link></Typography>
            </Grid>
        </Grid>
    );
}
