import {Request, Response} from "express";
import algebraService from "../services/algebra.service";
import httpResponse from "../services/httpApi.service";
import {get} from "lodash";

class AlgebraController {

    public solveEquation = (req: Request, res: Response) => {
        const equation = get(req, "body.equation", "");
        const result = algebraService.solveEquation(equation);
        return (result.length > 0) ?
            httpResponse.success(res, result) :
            httpResponse.failed(res, result);
    };
}

const algebraController = new AlgebraController;

export default algebraController;
