import HttpClient from "../config/HttpClient";

export class AuthResource {
    private static readonly httpClient = HttpClient;
    private static readonly apiUrl = process.env['REACT_APP_API_URL'] as string;
    private static readonly url = `${AuthResource.apiUrl}/auth`;

    public static registerUser(token: string): Promise<any> {
        return AuthResource.httpClient
            .post(`${AuthResource.url}/register`, { token });
    }

    public static signIn(token: string): Promise<any> {
        return AuthResource.httpClient
            .post(`${AuthResource.url}/sign-in`, { token });
    }
}