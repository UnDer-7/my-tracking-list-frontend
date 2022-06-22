import jwtDecode from 'jwt-decode';
import axios from 'axios';

export function decodeJWT<T>(jwt: string): T {
    return jwtDecode<T>(jwt);
}

export function isAxiosError(e: any): boolean {
    return axios.isAxiosError(e)
}
