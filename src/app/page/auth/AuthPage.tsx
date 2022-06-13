import React, { ReactElement } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useRoutes } from '../../hooks/useRoutes';

export function AuthPage(): ReactElement {
    const { goToRegister, goToSignIn } = useRoutes();

    return (
        <Grid item container spacing={ 2 } direction="row" justifyContent="center" xs={ 12 }>
            <Grid container justifyContent="center" alignItems="center" item xs={ 12 }>
                <Typography variant="h3">My Tracking List</Typography>
            </Grid>
            <Grid item>
                <Button
                    size="medium"
                    color="primary"
                    variant="outlined"
                    onClick={ goToSignIn }>
                    Sign in
                </Button>
            </Grid>
            <Grid item>
                <Button
                    size="medium"
                    color="secondary"
                    variant="outlined"
                    onClick={ goToRegister }>
                    Register
                </Button>
            </Grid>

        </Grid>

    );
}
