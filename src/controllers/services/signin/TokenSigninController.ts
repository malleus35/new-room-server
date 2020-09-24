import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";

// import SigninService from "@src/services/SigninService";

import resTypes from "@src/utils/resTypes";
import JwtService from "@src/services/middlewares/JwtService";

class TokenSigninController extends Controller {
    private decodedPayload: string;
    private accessToken: string | object | null;
    constructor() {
        super();
        this.decodedPayload = "";
        this.accessToken = "";
    }

    async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.decodedPayload = req.body.decoded.email;
        this.accessToken = await JwtService.createAccessToken(
            this.decodedPayload
        );
    }

    async doResponse(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        resTypes.successRes(res, "Login");
    }
}

export default TokenSigninController;
