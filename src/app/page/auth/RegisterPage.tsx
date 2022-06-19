import React, { ReactElement, useEffect } from 'react';
import { Button, Grid, Link, Typography } from '@mui/material';
import { useRoutes } from '../../utils/hooks/useRoutes';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useRedux';
import { addNewUser, selectStatus, setStatus } from '../../slice/CurrentUserSlice';
import { GoogleIcon } from '../../utils/components/Icons';
import { BlockUI } from '../../utils/components/BlockUI';

export function RegisterPage(): ReactElement {
    const { goToSignIn, goToHome } = useRoutes();
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
        dispatch(addNewUser(res.code))
    }

    function onError(res: any) {
        console.log('Err: ', res);
    }

    return (
        <BlockUI active={ canBlockUI }>
            <Grid item container spacing={ 2 } direction="row" justifyContent="center" xs={ 12 }>
                <Grid container justifyContent="center" alignItems="center" item xs={ 12 }>
                    <Typography variant="h3">New Account</Typography>
                </Grid>
                <Grid item textAlign="center">
                    <Button
                        size="medium"
                        variant="outlined"
                        startIcon={ <GoogleIcon/> }
                        onClick={ login }>
                        Register with Google
                    </Button>
                    <br/>
                    <br/>
                    <Typography variant="caption">Already have an account? <Link underline="hover"
                                                                                 onClick={ goToSignIn }>Sign
                        in</Link></Typography>
                </Grid>
            </Grid>
        </BlockUI>
    );
}
