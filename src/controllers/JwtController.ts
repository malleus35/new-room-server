import MiddlewareController from "@src/controllers/MiddlewareController";
import JwtService from "@src/services/middlewares/JwtService";
import LogService from "@src/utils/LogService";
import { NextFunction, Request, Response } from "express";

const logger = LogService.getInstance();
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
    private isNewSigninReq(req: Request): boolean {
        return (req.body.accessToken === "" ||
            req.body.accessToken === undefined) &&
            (req.body.refreshToken === "" ||
                req.body.refreshToken === undefined)
            ? true
            : false;
    }

    private isNewSigninRes(): boolean {
        return this.checkValidAccess === "" && this.checkValidRefresh === "";
    }
    private isInternalServerErrorRes(): boolean {
        return !this.accessToken || this.accessToken === "";
    }
    private async newSigninInit(req: Request): Promise<void> {
        this.accessToken = await JwtService.createAccessToken({
            name: req.body.name
        });
        this.refreshToken = await JwtService.createRefreshToken({
            name: req.body.name
        });
    }

    private async alreadySigninInit(req: Request): Promise<void> {
        this.accessToken = req.body.accessToken;
        this.refreshToken = req.body.refreshToken;

        this.checkValidAccess = await JwtService.verifyToken(this.accessToken);
        this.checkValidRefresh = await JwtService.verifyToken(
            this.refreshToken
        );
    }

    private newSigninRes(req: Request, next: NextFunction): void {
        logger.info("Refresh Token Successfully Created");
        req.body.tokens.accessToken = this.accessToken;
        req.body.tokens.refreshToken = this.refreshToken;
        next();
    }

    private internalServerErrorRes(res: Response): void {
        logger.error("Internal Server Error for create Jwt Token.");
        res.status(500).json({
            msg: "Internal Server Error for create Jwt Token"
        });
    }

    private isUseOnlyAccessTokenRes(): boolean {
        return this.checkValidRefresh === "NoExistedToken";
    }

    private isTokenExpired(checkValid: string | object | null): boolean {
        return checkValid === "ExpiredToken";
    }
    private accessTokenExpiredRes(res: Response): void {
        logger.error("Access Token is expired.");
        res.status(401).json({
            msg: "Access Token is expired"
        });
    }

    private isTokenInvalid(checkValid: string | object | null): boolean {
        return checkValid === "InvalidToken";
    }

    private accessTokenInvalidRes(res: Response): void {
        logger.error("Access Token is Invalid.");
        res.status(401).json({
            msg: "Access Token is Invalid"
        });
    }

    private accessTokenSuccessRes(next: NextFunction): void {
        logger.info("Access Token Successfully Verified");
        next();
    }

    private refreshTokenExpiredRes(res: Response): void {
        logger.info("Refresh Token is expired");
        res.status(401).json({
            msg: "Refresh Token is expired",
            accessToken: "",
            refreshToken: ""
        });
    }

    private refreshTokenInvalidRes(res: Response): void {
        logger.info("Refresh Token is Invalid");
        res.status(401).json({
            msg: "Refresh Token is Invalid",
            accessToken: "",
            refreshToken: ""
        });
    }
    private async refreshTokenSuccessRes(
        req: Request,
        next: NextFunction
    ): Promise<void> {
        logger.info("Refresh Token Successfully Verified");
        this.accessToken = await JwtService.createAccessToken({
            name: req.body.name
        });
        req.body.tokens.accessToken = this.accessToken;
        next();
    }
    async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        if (this.isNewSigninReq(req)) this.newSigninInit(req);
        else this.alreadySigninInit(req);
    }

    async doMiddlewareResponse(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        req.body.tokens = {};
        req.body.tokens.accessToken = undefined;
        req.body.tokens.refreshToken = undefined;

        if (this.isInternalServerErrorRes()) {
            this.internalServerErrorRes(res);
        } else if (this.isNewSigninRes()) {
            this.newSigninRes(req, next);
        } else if (this.isUseOnlyAccessTokenRes()) {
            if (this.isTokenExpired(this.checkValidAccess)) {
                this.accessTokenExpiredRes(res);
            } else if (this.isTokenInvalid(this.checkValidAccess)) {
                this.accessTokenInvalidRes(res);
            } else {
                this.accessTokenSuccessRes(next);
            }
        } else {
            if (this.isTokenExpired(this.checkValidRefresh)) {
                this.refreshTokenExpiredRes(res);
            } else if (this.isTokenInvalid(this.checkValidRefresh)) {
                this.refreshTokenInvalidRes(res);
            } else {
                this.refreshTokenSuccessRes(req, next);
            }
        }
    }
}

export default JwtController;
