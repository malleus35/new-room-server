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

class JwtVerifyAccessController extends Controller {
    private verify: string | object | undefined;
    constructor() {
        super();
        this.verify = undefined;
    }
    async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.verify = await JwtService.verifyToken(
            req.headers.authorization?.split(" ")[1]
        );
    }
    async doResolve(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        if (typeof this.verify !== "string") {
            req.decoded = this.verify;
            next();
        } else resTypes.tokenErrorRes(res);
    }
}

export default JwtVerifyAccessController;
