import React, { ReactElement, useState } from 'react';
import { Button, Grid, Link, Typography } from '@mui/material';
import { GoogleIcon } from '../../utils/components/Icons';
import { useRoutes } from '../../utils/hooks/useRoutes';
import { useAppDispatch } from '../../utils/hooks/useRedux';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { addSnackBarError } from '../../slice/SnackBarSlice';
import { BlockUI } from '../../utils/components/BlockUI';
import { AuthService } from '../../service/AuthService';
import { isServerErrorResponse } from '../../utils/helpers/TypeGuards';

export function SignInPage(): ReactElement {
    const { goToRegister, goToHome } = useRoutes();
    const dispatch = useAppDispatch();
    const [canBlockUI, setCanBlockUI] = useState(false)

    const login = useGoogleLogin({
        onSuccess,
        onError,
        flow: 'auth-code',
    });

    function onSuccess(res: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>) {
        setCanBlockUI(true);
        AuthService.executeLogin(res.code)
            .then(() => goToHome())
            .catch((err) => {
                if (isServerErrorResponse(err)) {
                    console.warn('Server returned an error: ', err);
                    dispatch(addSnackBarError({ message: err.userMsg }))
                } else {
                    console.error('Error while registering user. ', err);
                    dispatch(addSnackBarError({ message: 'Sorry, something went wrong' }))
                }
            })
            .finally(() => setCanBlockUI(false));
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
                    <Typography variant="caption">Don’t have an account? </Typography>
                    <Link underline="hover" onClick={ goToRegister } style={ { cursor: 'pointer' } }>
                        <Typography variant="caption">Sign Up</Typography></Link>
                </Grid>
            </Grid>
        </BlockUI>
    );
}
