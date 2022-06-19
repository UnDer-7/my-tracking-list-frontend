import HttpClient from "../config/HttpClient";
import { TokenResponse } from './payloads/TokenResponse';
import axios, { AxiosResponse } from 'axios';
import { ServerErrorResponse } from './shared/ServerErrorResponse';

export class AuthResource {
    private static readonly httpClient = HttpClient;
    private static readonly url = `${process.env['REACT_APP_API_URL']}/auth`;

    public static signIn(authCode: string): Promise<TokenResponse> {
        return AuthResource.httpClient
            .post(`${AuthResource.url}/google/sign-in`, {}, {
                headers: { 'Auth-code': authCode }
            })
            .then(({ data }) => data)
    }

    public static registerUser(authCode: string): Promise<TokenResponse> {
        return AuthResource.httpClient
            .post(`${AuthResource.url}/google/register`, {}, {
                headers: { 'Auth-code': authCode }
            })
            .then(({ data }) => data)
            .catch((err) => {
                if (axios.isAxiosError(err)) {
                    return Promise.reject(err.response?.data)
                }
                console.error('Error: ', err);
                return Promise.reject(err);
            })
    }

    public static refreshToken(refreshToken: string): Promise<TokenResponse> {
        return AuthResource.httpClient
            .post(`${AuthResource.url}/google/refresh`, {}, {
                headers: { 'Refresh-token': refreshToken }
            })
            .then(({ data }) => data)
    }
}
