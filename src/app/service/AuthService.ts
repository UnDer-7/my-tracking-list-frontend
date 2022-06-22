import { AuthResource }  from '../resources/AuthResource';
import { LocalStorageKeys, LocalStorageService } from './LocalStorageService';
import { decodeJWT } from '../utils/helpers/Helpers';
import { Token } from '../utils/types/Token';
import { isAfter } from 'date-fns';
import { TokenResponse } from '../resources/payloads/TokenResponse';

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

    public static async executeLogin(authCode: string): Promise<Token> {
        const { tokenEncoded, refreshTokenEncoded } = await AuthResource.signIn(authCode);
        LocalStorageService.save(LocalStorageKeys.JWT_TOKEN, tokenEncoded);
        LocalStorageService.save(LocalStorageKeys.REFRESH_TOKEN, refreshTokenEncoded);

        return {
            ...decodeJWT<Token>(tokenEncoded),
            encodedToken: tokenEncoded,
            encodedRefreshToken: refreshTokenEncoded,
        }
    }

    public static executeLogout(): Promise<any> {
        throw Error('Tem q implementar')
    }

    public static async executeRefreshToke(): Promise<TokenResponse> {
        const refreshToken = LocalStorageService.getValue(LocalStorageKeys.REFRESH_TOKEN);

        if (!refreshToken) {
            console.error('RefreshToken was not set in LocalStorage');
            return Promise.reject('RefreshToken was not set in LocalStorage')
        }

        const response = await AuthResource.refreshToken(refreshToken);
        LocalStorageService.save(LocalStorageKeys.JWT_TOKEN, response.tokenEncoded);
        LocalStorageService.save(LocalStorageKeys.REFRESH_TOKEN, response.refreshTokenEncoded);
        return response;
    }

    public static isLoggedIn(): boolean {
        return !!LocalStorageService.getValue(LocalStorageKeys.JWT_TOKEN);
    }

    public static isTokenExpired(): boolean {
        const jwtEncoded = LocalStorageService.getValue(LocalStorageKeys.JWT_TOKEN)
        if (!jwtEncoded) return true;

        const currentTime = new Date();
        const token = decodeJWT<Token>(jwtEncoded)
        const tokenExp = new Date(token.exp * 1000);

        return isAfter(currentTime, tokenExp)
    }
}
