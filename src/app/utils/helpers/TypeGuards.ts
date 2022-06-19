import { ServerErrorResponse } from '../../resources/shared/ServerErrorResponse';

export function isServerErrorResponse(err: unknown): err is ServerErrorResponse {
    return (err as ServerErrorResponse).errCode !== undefined &&
        (err as ServerErrorResponse).userMsg !== undefined &&
        (err as ServerErrorResponse).statusCode !== undefined &&
        (err as ServerErrorResponse).timestamp !== undefined &&
        (err as ServerErrorResponse).errUniqueIdentifier !== undefined;
}
