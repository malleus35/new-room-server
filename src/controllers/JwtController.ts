import MiddlewareController from "@src/controllers/MiddlewareController";
import JwtService from "@src/services/middlewares/JwtService";
import LogService from "@src/utils/LogService";
import { NextFunction, Request, Response } from "express";

const logger = LogService.getInstance();
/*
로직
// 1.로그인을 하는 경우(유효한 토큰이 없는경우 === 첫로그인, refreshToken이 만료된 경우), accessToken, refreshToken을 발급해주면 됨.
2.accessToken이 만료되었다는 요청을 받을 경우, refreshToken을 사용해서 accessToken을 재발급하고 refreshToken도 같이 재발급 한다.
3.다른 API를 이용할 때, refreshToken이 만료가 안되어있으면, 재로그인 시킨다.
4.
*/
class JwtController extends MiddlewareController {
    constructor() {
        super();
    }
    static async verifyAccessToken(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const verify = await JwtService.verifyToken(req.headers.accessToken);
        if (typeof verify !== "string") {
            req.body.decoded = verify;
            next();
        } else {
            res.status(401).json({
                status: 401,
                msg: "Token is Invalid or Expired!"
            });
        }
    }

    static async verifyRefreshToken(
        req: Request,
        res: Response
    ): Promise<void> {
        if (
            typeof (await JwtService.verifyToken(req.headers.refreshToken)) !==
            "string"
        ) {
            const decode = await JwtService.decodeToken(
                req.headers.accessToken
            );
            if (decode !== null && typeof decode !== "string") {
                res.status(200).json({
                    status: 200,
                    msg: "Resign success!",
                    data: {
                        accessToken: await JwtService.createAccessToken(
                            decode.payload.email
                        ),
                        refreshToken: await JwtService.createRefreshToken()
                    }
                });
            }
        } else {
            res.status(401).json({
                status: 401,
                msg: "Token is Invalid or Expired!"
            });
        }
    }

    async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {}
    async doMiddlewareResponse(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {}
}

export default JwtController;
