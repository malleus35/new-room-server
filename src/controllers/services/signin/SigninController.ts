import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";

import SigninService from "@src/services/SigninService";

import resTypes from "@src/utils/resTypes";
import JwtService from "@src/services/middlewares/JwtService";
import TokenDao from "@src/models/TokenDao";

class SigninController extends Controller {
    private result: string;
    private accessToken: string;
    private refreshToken: string;
    private isSaved: string | number;
    constructor() {
        super();
        this.result = "";
        this.accessToken = "";
        this.refreshToken = "";
        this.isSaved = "";
    }

    async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await SigninService.signin(req, res, next);
        this.accessToken = await JwtService.createAccessToken(req.body.email);
        this.refreshToken = await JwtService.createRefreshToken();

        await TokenDao.getInstance().save(req.body.email, this.refreshToken);
        await TokenDao.getInstance().find(req.body.email);
    }

    async doResolve(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        switch (this.result) {
            case "BadRequest":
                resTypes.badRequestErrorRes(res);
                break;
            case "InternalServerError":
                resTypes.internalErrorRes(res);
                break;
            case "NoExistUser":
                resTypes.noExistUserRes(res);
                break;
            case "WrongPassword":
                resTypes.wrongPasswordRes(res);
                break;
            default:
                resTypes.successRes(res, "Login", {
                    accessToken: this.accessToken,
                    refreshToken: this.refreshToken
                });
        }
    }
}

export default SigninController;
