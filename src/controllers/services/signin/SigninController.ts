import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";

import SigninService from "@src/services/SigninService";

import resTypes from "@src/utils/resTypes";
class SigninController extends Controller {
    private result: string;
    constructor() {
        super();
        this.result = "";
    }

    async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await SigninService.signin(req, res, next);
    }

    async doResponse(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        if (this.result === "BadRequest") resTypes.badRequestErrorRes(res);
        else if (this.result === "InternalServerError")
            resTypes.internalErrorRes(res);
        else if (this.result === "NoExistUser") resTypes.dbErrorRes(res);
        else resTypes.successRes(res, "Login");
    }
}

export default SigninController;
