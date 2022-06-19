import HttpClient from '../config/HttpClient';
import { TokenResponse } from './payloads/TokenResponse';
import { Resource } from './shared/Resource';

export class AuthResource extends Resource {
    private static readonly httpClient = HttpClient;
    private static readonly url = `${ process.env['REACT_APP_API_URL'] }/auth`;

    public static signIn(authCode: string): Promise<TokenResponse> {
        return AuthResource.httpClient
            .post(`${ AuthResource.url }/google/sign-in`, {}, {
                headers: { 'Auth-code': authCode }
            })
            .then(this.getBody)
            .catch(this.handleErr)
    }

    public static registerUser(authCode: string): Promise<TokenResponse> {
        return AuthResource.httpClient
            .post(`${ AuthResource.url }/google/register`, {}, {
                headers: { 'Auth-code': authCode }
            })
            .then(this.getBody)
            .catch(this.handleErr)
    }

    public static refreshToken(refreshToken: string): Promise<TokenResponse> {
        return AuthResource.httpClient
            .post(`${ AuthResource.url }/google/refresh`, {}, {
                headers: { 'Refresh-token': refreshToken }
            })
            .then(({ data }) => data)
            .catch(this.handleErr)
    }
}
