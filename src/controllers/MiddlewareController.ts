import Controller from "@src/controllers/Controller";
import { NextFunction, Request, Response } from "express";

abstract class MiddlewareController extends Controller {
    constructor() {
        super();
    }

    protected abstract async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;
    protected async doResponse(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        await this.doMiddlewareResponse(req, res, next);
    }

    protected abstract async doMiddlewareResponse(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>;
}

export default MiddlewareController;
