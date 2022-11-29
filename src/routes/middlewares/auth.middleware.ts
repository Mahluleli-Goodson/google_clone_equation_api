import {NextFunction, Request, Response} from "express";
import {get} from "lodash";
import appUtil from "../../utils/application.util";
import stringUtil from "../../utils/string.util";

class AuthMiddleware {

    public default = (req: Request, res: Response, next: NextFunction) => {
        const apiKey = get(req, "headers.authorization", "").replace("Bearer", "");

        // @note: normally this is given per user and compared against a database table,
        // but for this exercise we assume a single valid key
        if (stringUtil.removeWhiteSpace(apiKey) != appUtil.apiKey || stringUtil.isEmpty(apiKey)) {
            return res.sendStatus(403);
        }
        return next();
    }
}

const auth = new AuthMiddleware;

export default auth;
