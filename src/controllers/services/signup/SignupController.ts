import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";

import resTypes from "@src/utils/resTypes";

import LogService from "@src/utils/LogService";
import SignupService from "@src/services/SignupService";
class SignupController extends Controller {
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
        this.result = await SignupService.signup(req, res, next);
    }
    async doResolve(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        if (this.result === "BadRequest") resTypes.badRequestErrorRes(res);
        else if (this.result === "InternalServerError")
            resTypes.internalErrorRes(res);
        else if (this.result === "PasswordFail") resTypes.wrongPasswordRes(res);
        else resTypes.successRes(res, "Signup");
    }
}

export default SignupController;
