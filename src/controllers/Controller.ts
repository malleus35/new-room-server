import {
    ErrorRequestHandler,
    NextFunction,
    Request,
    RequestHandler,
    RequestParamHandler,
    Response
} from "express";

abstract class Controller {
    protected controlFunction: any;
    protected abstract doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): void;
    protected abstract doResponse(
        req: Request,
        res: Response,
        next: NextFunction
    ): void;
    constructor() {
        this.controlFunction = async (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            await this.doService(req, res, next);
            await this.doResponse(req, res, next);
        };
    }
    getController() {
        return this.controlFunction;
    }
}

export default Controller;
