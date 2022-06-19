import HttpClient from "../config/HttpClient";
import { Resource } from './shared/Resource';

export class UserResource extends Resource {
    private static readonly httpClient = HttpClient;
    private static readonly apiUrl = process.env['REACT_APP_API_URL'] as string;
    private static readonly resourceUrl = `${UserResource.apiUrl}/users`;

    public static getCurrentUser(): Promise<any> {
        return UserResource.httpClient
            .get(UserResource.resourceUrl)
            .then(this.getBody)
            .catch(this.handleErr)
    }
}
