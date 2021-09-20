import React, { ReactElement } from 'react';

import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { Facebook, GitHub, Google } from '@mui/icons-material';

export function Login(): ReactElement {
    const clientID = process.env['REACT_APP_GOOGLE_CLIENT_ID'] as string;

    function onSuccess(url: string): (res: (GoogleLoginResponse | GoogleLoginResponseOffline)) => void {
        return (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    token: (res as GoogleLoginResponse).tokenId,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(res => {
                    console.log('REPONSE: ', res)
                });
        }

    }

    function onFailure(res: any) {
        console.log('Failure: ', res)
    }

    return (
        <Grid container component="main" sx={ { 'height': '100vh' } }>
            <Grid item
                  xs={ false }
                  sm={ 4 }
                  md={ 7 }
                  sx={ {
                      backgroundImage: 'url(https://source.unsplash.com/random)',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                  } }
            />
            <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square container>
                <Grid item xs={ 12 }>
                    <Typography variant="h5" component="h1" align="center">My Tracking List</Typography>
                </Grid>
                <Grid item container spacing={0} textAlign="center">
                    <Grid xs={ 12 } item>
                        <Typography component="h1" variant="h5" align="center">
                            Sign In
                        </Typography>
                        <div>
                            <GoogleLogin
                                clientId={ clientID }
                                onSuccess={ onSuccess('http://localhost:8080/v1/auth/create/google') }
                                onFailure={ onFailure }
                                cookiePolicy="single_host_origin"
                                render={({ onClick, disabled}) => (
                                    <Button size="medium"
                                            onClick={onClick}
                                            disabled={disabled}
                                            variant="outlined"
                                            startIcon={<Google />}
                                            sx={{ width: 170}}>
                                        With Google
                                    </Button>
                                )}
                            />
                        </div>
                        <div>
                            <Button size="medium" variant="outlined" startIcon={<Facebook />} sx={{ width: 170}}>With Facebook</Button>
                        </div>
                        <div>
                            <Button size="medium" variant="outlined" startIcon={<GitHub />} sx={{ width: 170}}>With GitHub</Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
