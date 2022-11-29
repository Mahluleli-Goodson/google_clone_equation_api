import {Response} from "express";

export enum httpMessage {
    SUCCESS = "Request was successful",
    FAILED = "Request failed",
    ERROR = "Request resulted in an error",
}

class HttpApiService {

    public success = (res: Response, result: any, message: string = httpMessage.SUCCESS) => {
        const jsonRes = {
            code: 200,
            message,
            errors: [],
            result
        };
        return res.status(200).json(jsonRes);
    };

    public failed = (res: Response, result: any, errors: string[] = [], message: string = httpMessage.FAILED) => {
        const jsonRes = {
            code: 422,
            message,
            errors,
            result
        };
        return res.status(422).json(jsonRes);
    };
}

const httpResponse = new HttpApiService;

export default httpResponse;
