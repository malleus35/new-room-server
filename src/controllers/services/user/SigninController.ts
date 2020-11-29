import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";

import UserService from "@src/services/UserService";

import resTypes from "@src/utils/resTypes";
import JwtService from "@src/services/middlewares/JwtService";
import TokenDao from "@src/dao/TokenDao";
import User from "@src/models/UserModel";

class SigninController extends Controller {
    private result: User | string;
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
        try {
            this.result = await UserService.findSignIn(req);
            this.accessToken = await JwtService.createAccessToken(
                req.body.email
            );
            this.refreshToken = await JwtService.createRefreshToken();

            await TokenDao.getInstance().save(
                req.body.email,
                this.refreshToken
            );
            await TokenDao.getInstance().find(req.body.email);
        } catch (e: unknown) {
            this.result = "InternalServerError";
            console.log(e);
        }
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
            case "CannotFindItem":
                resTypes.cannotFindItemRes(res, "user");
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
