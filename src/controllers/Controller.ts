import {
    ErrorRequestHandler,
    NextFunction,
    Request,
    RequestHandler,
    RequestParamHandler,
    Response
} from "express";

abstract class Controller {
    protected controlFunction:
        | RequestHandler
        | RequestParamHandler
        | ErrorRequestHandler;
    protected abstract doService(): unknown;
    protected abstract doResponse(): unknown;
    constructor() {
        this.controlFunction = (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            this.doService();
            this.doResponse();
        };
    }
}

export default Controller;
