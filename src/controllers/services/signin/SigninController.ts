import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";

import SigninService from "@src/services/SigninService";

import resTypes from "@src/utils/resTypes";
import JwtService from "@src/services/middlewares/JwtService";
class SigninController extends Controller {
    private result: string;
    private accessToken: string;
    private refreshToken: string;
    constructor() {
        super();
        this.result = "";
        this.accessToken = "";
        this.refreshToken = "";
    }

    async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await SigninService.signin(req, res, next);
        this.accessToken = await JwtService.createAccessToken(req.body.email);
        this.refreshToken = await JwtService.createRefreshToken();
    }

    async doResponse(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        if (this.result === "BadRequest") resTypes.badRequestErrorRes(res);
        else if (this.result === "InternalServerError")
            resTypes.internalErrorRes(res);
        else if (this.result === "NoExistUser") resTypes.noExistUserRes(res);
        else if (this.result === "WrongPassword")
            resTypes.wrongPasswordRes(res);
        else
            resTypes.successRes(res, "Login", {
                accessToken: this.accessToken,
                refreshToken: this.refreshToken
            });
    }
}

export default SigninController;
