import HttpClient from "../config/HttpClient";

export class UserResource {
    private static readonly httpClient = HttpClient;
    private static readonly apiUrl = process.env['REACT_APP_API_URL'] as string;
    private static readonly resourceUrl = `${UserResource.apiUrl}/users`;

    public static getMyHome(): Promise<any> {
        return UserResource.httpClient
            .get(`${UserResource.resourceUrl}/my-home`)
    }
}