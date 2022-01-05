import axios, {AxiosRequestConfig} from "axios";
import {AuthService} from "../service/AuthService";

const httpClient = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

// httpClient.interceptors.request.use(req => {
//     req.headers = {
//         'Access-Control-Allow-Origin': '*'
//     }
//
//     return req;
// })

httpClient.interceptors.request.use((req) => {
    if (AuthService.isLoggedIn()) {
        const setHeaders = () => {
            // @ts-ignore todo: fix
            req.headers.Authorization = `Bearer ${AuthService.getToken()}`;
            return Promise.resolve(req);
        };

        return AuthService.updateToken(setHeaders);
    }
})
export default httpClient;
