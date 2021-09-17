import React from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

export function Login() {
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
        <>
            <GoogleLogin
                clientId={ clientID }
                buttonText="New User"
                onSuccess={ onSuccess('http://localhost:8080/v1/auth/create/google') }
                onFailure={ onFailure }
                cookiePolicy="single_host_origin"
            />
            <br/>
            <br/>
            <GoogleLogin
                clientId={clientID}
                buttonText="Login"
                onSuccess={onSuccess('http://localhost:8080/v1/auth/login/google')}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
            />
        </>
    )
}
