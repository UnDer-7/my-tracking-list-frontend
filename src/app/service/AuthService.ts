import { AuthResource } from '../resources/AuthResource';
import { LocalStorageKeys, LocalStorageService } from './LocalStorageService';
import { decodeJWT } from '../utils/helpers/Helpers';
import { Token } from '../utils/types/Token';
import { isAfter } from 'date-fns';

export class AuthService {
    public static async registerUser(authCode: string): Promise<Token> {
        const { tokenEncoded, refreshTokenEncoded } = await AuthResource.registerUser(authCode)
        LocalStorageService.save(LocalStorageKeys.JWT_TOKEN, tokenEncoded);
        LocalStorageService.save(LocalStorageKeys.REFRESH_TOKEN, refreshTokenEncoded);

        return {
            ...decodeJWT<Token>(tokenEncoded),
            encodedToken: tokenEncoded,
            encodedRefreshToken: refreshTokenEncoded
        }
    }

    public static executeLogin(): Promise<any> {
        throw Error('Tem q implementar')
    }

    public static executeLogout(): Promise<any> {
        throw Error('Tem q implementar')
    }

    public static isLoggedIn(): boolean {
        return !!LocalStorageService.getValue(LocalStorageKeys.JWT_TOKEN);
    }

    private static isTokenExpired(jwtEncoded: string): boolean {
        const currentTime = new Date();
        const token = decodeJWT<Token>(jwtEncoded)
        const tokenExp = new Date(token.exp * 1000);

        return isAfter(tokenExp, currentTime)
    }
}
