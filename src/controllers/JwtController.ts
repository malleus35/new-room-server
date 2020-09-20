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
    private accessToken: string | unknown;
    private refreshToken: string | unknown;
    private checkValidAccess: string | object | null;
    private checkValidRefresh: string | object | null;
    constructor() {
        super();
        this.checkValidAccess = "";
        this.checkValidRefresh = "";
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
        } else {
            res.status(401).json({
                status: 401,
                msg: "Token is Invalid or Expired!"
            });
        }
    }
    // private isNewSigninReq(req: Request): boolean {
    //     return !(req.body.accessToken || req.body.refreshToken);
    // // }
    // private async newSigninInit(req: Request): Promise<void> {
    //     this.accessToken = await JwtService.createAccessToken({
    //         name: req.body.name
    //     });
    //     this.refreshToken = await JwtService.createRefreshToken({
    //         name: req.body.name
    //     });
    // }
    //로그인을 새로 하는 것이면, 이 부분이 의미가 없음.
    // private async alreadySigninInit(req: Request): Promise<void> {
    //     if (!this.isNewSigninReq(req)) {
    //         this.accessToken = req.body.accessToken;
    //         this.refreshToken = req.body.refreshToken;

    //         this.checkValidAccess = await JwtService.verifyToken(
    //             this.accessToken
    //         );
    //         this.checkValidRefresh = await JwtService.verifyToken(
    //             this.refreshToken
    //         );
    //     }
    // }
    // private async signinInit(req: Request): Promise<void> {
    //     // return this.isNewSigninReq(req)
    //         // ? this.newSigninInit(req)
    //         // : this.alreadySigninInit(req);

    // }
    // private async signinInit(req: Request): Promise<void> {

    // }

    // private isNewSigninRes(): boolean {
    //     return this.checkValidAccess === "" && this.checkValidRefresh === "";
    // }

    // private newSigninRes(req: Request, next: NextFunction): void {
    //     if (this.isNewSigninRes()) {
    //         logger.info("Refresh Token Successfully Created");
    //         req.body.tokens.accessToken = this.accessToken;
    //         req.body.tokens.refreshToken = this.refreshToken;
    //         next();
    //     }
    // }

    // private isInternalServerErrorRes(): boolean {
    //     return !this.accessToken || this.accessToken === "";
    // }
    // private internalServerErrorRes(res: Response): void {
    //     if (this.isInternalServerErrorRes()) {
    //         logger.error("Internal Server Error for create Jwt Token.");
    //         res.status(500).json({
    //             msg: "Internal Server Error for create Jwt Token"
    //         });
    //     }
    // }

    // private isUseOnlyAccessTokenRes(): boolean {
    //     return this.checkValidRefresh === "NoExistedToken";
    // }

    // private isExpiredAcessToken(): boolean {
    //     return (
    //         this.isUseOnlyAccessTokenRes() &&
    //         this.isTokenExpired(this.checkValidAccess)
    //     );
    // }

    // private isInvalidAcessToken(): boolean {
    //     return (
    //         this.isUseOnlyAccessTokenRes() &&
    //         this.isTokenInvalid(this.checkValidAccess)
    //     );
    // }
    // private isTokenExpired(checkValid: string | object | null): boolean {
    //     return checkValid === "ExpiredToken";
    // }
    // private isTokenInvalid(checkValid: string | object | null): boolean {
    //     return checkValid === "InvalidToken";
    // }
    // private accessTokenExpiredRes(res: Response): void {
    //     if (this.isExpiredAcessToken()) {
    //         logger.error("Access Token is expired.");
    //         res.status(401).json({
    //             msg: "Access Token is expired"
    //         });
    //     }
    // }
    // private isValidAccessToken(): boolean {
    //     return (
    //         this.isUseOnlyAccessTokenRes() &&
    //         !this.isTokenInvalid(this.checkValidAccess) &&
    //         !this.isTokenExpired(this.checkValidAccess)
    //     );
    // }

    // private isExpiredRefreshToken(): boolean {
    //     return (
    //         !this.isUseOnlyAccessTokenRes() &&
    //         this.isTokenExpired(this.checkValidRefresh)
    //     );
    // }
    // private accessTokenInvalidRes(res: Response): void {
    //     if (this.isInvalidAcessToken()) {
    //         logger.error("Access Token is Invalid.");
    //         res.status(401).json({
    //             msg: "Access Token is Invalid"
    //         });
    //     }
    // }

    // private accessTokenSuccessRes(next: NextFunction): void {
    //     if (this.isValidAccessToken()) {
    //         logger.info("Access Token Successfully Verified");
    //         next();
    //     }
    // }
    // private isInvalidRefreshToken(): boolean {
    //     return (
    //         !this.isUseOnlyAccessTokenRes() &&
    //         this.isTokenInvalid(this.checkValidRefresh)
    //     );
    // }
    // private isValidRefreshToken(): boolean {
    //     return !(
    //         this.isUseOnlyAccessTokenRes() ||
    //         this.isTokenInvalid(this.checkValidRefresh) ||
    //         this.isTokenExpired(this.checkValidRefresh)
    //     );
    // }

    // private refreshTokenExpiredRes(res: Response): void {
    //     if (this.isExpiredRefreshToken()) {
    //         logger.info("Refresh Token is expired");
    //         res.status(401).json({
    //             msg: "Refresh Token is expired",
    //             accessToken: "",
    //             refreshToken: ""
    //         });
    //     }
    // }

    // private refreshTokenInvalidRes(res: Response): void {
    //     if (this.isInvalidRefreshToken()) {
    //         logger.info("Refresh Token is Invalid");
    //         res.status(401).json({
    //             msg: "Refresh Token is Invalid",
    //             accessToken: "",
    //             refreshToken: ""
    //         });
    //     }
    // }
    // private async refreshTokenSuccessRes(
    //     req: Request,
    //     next: NextFunction
    // ): Promise<void> {
    //     if (this.isValidRefreshToken()) {
    //         logger.info("Refresh Token Successfully Verified");
    //         this.accessToken = await JwtService.createAccessToken({
    //             name: req.body.name
    //         });
    //         req.body.tokens.accessToken = this.accessToken;
    //         next();
    //     }
    // }

    private initResponse(req: Request): void {
        req.body.tokens = {};
        req.body.tokens.accessToken = undefined;
        req.body.tokens.refreshToken = undefined;

        logger.info(this.accessToken);
        logger.info(this.refreshToken);
    }

    private chooseAndSendRightResponse(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        // this.internalServerErrorRes(res);
        // this.newSigninRes(req, next);
        // this.accessTokenExpiredRes(res);
        // this.accessTokenInvalidRes(res);
        // this.accessTokenSuccessRes(next);
        // this.refreshTokenExpiredRes(res);
        // this.refreshTokenInvalidRes(res);
        // this.refreshTokenSuccessRes(req, next);
    }
    async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        // await this.signinInit(req);
    }
    async doMiddlewareResponse(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.initResponse(req);
        this.chooseAndSendRightResponse(req, res, next);
    }
}

export default JwtController;
