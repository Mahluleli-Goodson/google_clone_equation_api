import {Express, Request, Response} from "express";
import algebraController from "../controllers/algebra.controller";
import validationMiddleware from "./middlewares/validation.middleware";
import {solveEquationSchema} from "./schemas/algebra.schema";
import auth from "./middlewares/auth.middleware";

const routes = (app: Express) => {

    // check if app is up and running (health check app)
    app.get("/uptime", (req: Request, res: Response) => res.sendStatus(200));

    app.post(
        "/api/algebra/solve",
        [auth.default, validationMiddleware(solveEquationSchema)],
        algebraController.solveEquation
    );
};

export default routes;
