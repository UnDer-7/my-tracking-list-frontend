export interface ServerErrorResponse {
    errCode: string;
    userMsg: string;
    customMsg?: string;
    statusCode: number;
    timestamp: string;
    errUniqueIdentifier: string;
}
