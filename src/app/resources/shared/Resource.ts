import axios, { AxiosResponse } from 'axios';

export abstract class Resource {

    protected static getBody(response: AxiosResponse<any>): any {
        return response.data;
    }

    protected static handleErr(err: any): Promise<any> {
        if (axios.isAxiosError(err)) {
            return Promise.reject(err.response?.data)
        }
        console.error('Error is not an AxiosError. ', err);
        return Promise.reject(err);
    }
}
