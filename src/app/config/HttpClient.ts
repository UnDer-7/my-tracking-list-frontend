import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthService } from '../service/AuthService';
import { LocalStorageKeys, LocalStorageService } from '../service/LocalStorageService';

const httpClient = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

const skipUrls = [
    '/google/refresh',
    '/google/register',
    '/google/sign-in'
];

async function refreshTokenInterceptor(req: AxiosRequestConfig): Promise<void> {
    if (AuthService.isTokenExpired() && !skipUrls.some(refreshUrl => req.url?.endsWith(refreshUrl))) {
        await AuthService.executeRefreshToke();
    }
}

function authorizationInterceptor(req: AxiosRequestConfig): void {
    if (!skipUrls.some(refreshUrl => req.url?.endsWith(refreshUrl))) {
        const jwt = LocalStorageService.getValue(LocalStorageKeys.JWT_TOKEN);
        // @ts-ignore
        req.headers['Authorization'] = `Bearer ${ jwt }`;
    }
}

httpClient.interceptors.request.use(
    async (req) => {
        if (AuthService.isLoggedIn()) {
            await refreshTokenInterceptor(req)
            authorizationInterceptor(req);
        }

        return req;
    },
    error => Promise.reject(error)
);

export function ConfigureHttpClient(url: string) {
    function urlFormatted(uri?: string): string {
        if (!uri) return url.replace(/([^:]\/)\/+/g, "$1");

        // remove multiple forward slashes
        // source: https://stackoverflow.com/a/15638147
        return `${url}/${uri}`.replace(/([^:]\/)\/+/g, "$1");
    }

    function getData<R = any>(response: AxiosResponse<R>): R {
        return response.data;
    }

    function handleError(err: any): Promise<any> {
        if (axios.isAxiosError(err)) {
            return Promise.reject(err.response?.data)
        }
        console.error('Error is not an AxiosError. ', err);
        return Promise.reject(err);
    }

    function POST<R, D = any>(uri?: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
        return httpClient.post(urlFormatted(uri), data, config)
            .then(getData)
            .catch(handleError);
    }

    function GET<R, D = any>(uri?: string, config?: AxiosRequestConfig<D>): Promise<R> {
        return httpClient.get(urlFormatted(uri), config)
            .then(getData)
            .catch(handleError);
    }

    function DELETE<R, D = any>(uri?: string, config?: AxiosRequestConfig<D>): Promise<R> {
        return httpClient.delete(urlFormatted(uri), config)
            .then(getData)
            .catch(handleError);
    }

    return {
        POST,
        GET,
        DELETE,
    };
}
