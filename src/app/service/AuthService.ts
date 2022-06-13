// export const AuthService = {
//     doLogin: () => console.log("Do Login"),
//     doLogout: () => console.log("Do logout"),
//     isLoggedIn: () => false,
//     getToken: () => "",
//     updateToken: (successCallback: () => void) => () => console.log("Refresh")
// };

import { AuthResource } from '../resources/AuthResource';
import { LocalStorageKeys, LocalStorageService } from './LocalStorageService';

export class AuthService {
    public static registerUser(authCode: string): void {
        AuthResource.registerUser(authCode)
            .then(value => {
                LocalStorageService.save(LocalStorageKeys.JWT_TOKEN, value.tokenEncoded);
                LocalStorageService.save(LocalStorageKeys.REFRESH_TOKEN, value.refreshTokenEncoded);
                return value;
            })
            .then(value => {

            })
    }
}
