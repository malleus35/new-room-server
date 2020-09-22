import Controller from "@src/controllers/Controller";
import JwtService from "@src/services/middlewares/JwtService";
import LogService from "@src/utils/LogService";
import { NextFunction, Request, Response } from "express";
import resTypes from "@src/utils/resTypes";
const logger = LogService.getInstance();
/*
로직
// 1.로그인을 하는 경우(유효한 토큰이 없는경우 === 첫로그인, refreshToken이 만료된 경우), accessToken, refreshToken을 발급해주면 됨.
2.accessToken이 만료되었다는 요청을 받을 경우, refreshToken을 사용해서 accessToken을 재발급하고 refreshToken도 같이 재발급 한다.
3.다른 API를 이용할 때, refreshToken이 만료가 안되어있으면, 재로그인 시킨다.
4.
*/

class JwtVerifyRefreshController extends Controller {
    private verify: string | object | null;
    private decode: any;
    constructor() {
        super();
        this.verify = null;
        this.decode = null;
    }
    async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.verify = await JwtService.verifyToken(req.headers.refreshToken);
        this.decode = await JwtService.decodeToken(req.headers.accessToken);
    }
    async doResponse(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        if (typeof this.verify === "string") resTypes.tokenErrorRes(res);
        else if (this.decode !== null && typeof this.decode !== "string") {
            resTypes.successRes(res, "Resign", {
                accessToken: await JwtService.createAccessToken(
                    this.decode.payload.email
                ),
                refreshToken: await JwtService.createRefreshToken()
            });
        } else resTypes.tokenErrorRes(res);
    }
}
