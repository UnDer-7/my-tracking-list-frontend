import { User } from '../resources/payloads/User';
import { UserResource } from '../resources/UserResource';

export class UserService {
    public static async getUser(): Promise<User> {
        return UserResource.getCurrentUser();
    }
}
