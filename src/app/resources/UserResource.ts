import { User } from './payloads/User';
import { ConfigureHttpClient } from '../config/HttpClient';

const HttpClient = ConfigureHttpClient(`${ process.env['REACT_APP_API_URL'] }/users`);

function getCurrentUser(): Promise<User> {
    return HttpClient.GET();
}

export const UserResource = {
    getCurrentUser,
};
