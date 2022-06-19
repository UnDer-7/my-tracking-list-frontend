import React, { ReactElement, useEffect } from 'react';
import { Button, Grid, Link, Typography } from '@mui/material';
import { GoogleIcon } from '../../utils/components/Icons';
import { useRoutes } from '../../utils/hooks/useRoutes';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useRedux';
import { doLoggingThunk, selectStatus, setStatus } from '../../slice/CurrentUserSlice';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { addSnackBarError } from '../../slice/SnackBarSlice';
import { BlockUI } from '../../utils/components/BlockUI';

export function SignInPage(): ReactElement {
    const { goToRegister, goToHome } = useRoutes();
    const dispatch = useAppDispatch();
    const requestStatus = useAppSelector(selectStatus);
    const canBlockUI = requestStatus === 'loading';

    const login = useGoogleLogin({
        onSuccess,
        onError,
        flow: 'auth-code',
    });

    useEffect(() => {
        switch (requestStatus) {
            case 'successes':
                goToHome();
                dispatch(setStatus('idle'));
        }
    }, [dispatch, goToHome, requestStatus]);

    function onSuccess(res: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>) {
        dispatch(doLoggingThunk(res.code))
    }

    function onError(res: any) {
        console.error('Error while communicating with Google ', res)
        dispatch(addSnackBarError({ message: 'Error while communicating with Google' }))
    }

    return (
        <BlockUI active={ canBlockUI }>
            <Grid item container spacing={ 2 } direction="row" justifyContent="center" xs={ 12 }>
                <Grid container justifyContent="center" alignItems="center" item xs={ 12 }>
                    <Typography variant="h3">Sign In</Typography>
                </Grid>
                <Grid item textAlign="center">
                    <Button
                        size="medium"
                        variant="outlined"
                        startIcon={ <GoogleIcon/> }
                        onClick={ login }>
                        Sign In with Google
                    </Button>
                    <br/>
                    <br/>
                    <Typography variant="caption">Don’t have an account? <Link underline="hover"
                                                                               onClick={ goToRegister }>
                        Sign Up</Link></Typography>
                </Grid>
            </Grid>
        </BlockUI>
    );
}
