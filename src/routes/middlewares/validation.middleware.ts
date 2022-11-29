import {AnyZodObject} from "zod";
import {NextFunction, Request, Response} from "express";
import httpResponse from "../../services/httpApi.service";
import logUtil from "../../utils/logger.util";

const validationMiddleware = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (e: any) {
        logUtil?.error(e, `[validationMiddleware] failed :: `);
        return httpResponse.failed(res, [], e.errors);
    }
};

export default validationMiddleware;
