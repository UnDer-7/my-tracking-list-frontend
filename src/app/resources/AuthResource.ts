import { TokenResponse } from './payloads/TokenResponse';
import { ConfigureHttpClient } from '../config/HttpClient';

const HttpClient = ConfigureHttpClient(`${ process.env['REACT_APP_API_URL'] }/auth`);

function signIn(authCode: string): Promise<TokenResponse> {
    return HttpClient.POST(
        '/google/sign-in',
        {},
        { headers: { 'Auth-code': authCode } }
    );
}

function registerUser(authCode: string): Promise<TokenResponse> {
    return HttpClient.POST(
        '/google/register',
        {},
        { headers: { 'Auth-code': authCode } }
    );
}

function refreshToken(refreshToken: string): Promise<TokenResponse> {
    return HttpClient.POST(
        'google/refresh',
        {},
        { headers: { 'Refresh-token': refreshToken } }
    );
}

export const AuthResource = {
    signIn,
    registerUser,
    refreshToken,
};
