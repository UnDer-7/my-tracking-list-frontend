import axios, { AxiosRequestConfig } from 'axios';
import { AuthService } from '../service/AuthService';
import { LocalStorageKeys, LocalStorageService } from '../service/LocalStorageService';

const httpClient = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

const refreshTokenUrl = [
    '/google/refresh'
];

async function handleRefreshToken(req: AxiosRequestConfig): Promise<void> {
    if (AuthService.isTokenExpired() && refreshTokenUrl.some(refreshUrl => !req.url?.endsWith(refreshUrl))) {
        await AuthService.executeRefreshToke();
    }
}

function setAuthorization(req: AxiosRequestConfig): void {
    if (refreshTokenUrl.some(refreshUrl => !req.url?.endsWith(refreshUrl))) {
        const jwt = LocalStorageService.getValue(LocalStorageKeys.JWT_TOKEN);
        // @ts-ignore
        req.headers['Authorization'] = `Bearer ${ jwt }`;
    }
}

httpClient.interceptors.request.use(
    async (req) => {
        if (AuthService.isLoggedIn()) {
            await handleRefreshToken(req)
            setAuthorization(req);
        }

        return req;
    },
    error => Promise.reject(error)
);

export default httpClient;
