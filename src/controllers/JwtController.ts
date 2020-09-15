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

    async doService(req, res, next): Promise<void> {
        if (
            (req.body.accessToken === "" ||
                req.body.accessToken === undefined) &&
            (req.body.refreshToken === "" ||
                req.body.refreshToken === undefined)
        ) {
            this.accessToken = await JwtService.createAccessToken({
                name: req.body.name
            });
            this.refreshToken = await JwtService.createRefreshToken({
                name: req.body.name
            });
        } else {
            this.accessToken = req.body.accessToken;
            this.refreshToken = req.body.refreshToken;

            this.checkValidAccess = await JwtService.verifyToken(
                this.accessToken
            );
            this.checkValidRefresh = await JwtService.verifyToken(
                this.refreshToken
            );
        }
    }
    async doMiddlewareResponse(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        req.body.tokens = {};
        req.body.tokens.accessToken = undefined;
        req.body.tokens.refreshToken = undefined;
        if (!this.accessToken || this.accessToken === "") {
            logger.error("Internal Server Error for create Jwt Token.");
            res.status(500).json({
                msg: "Internal Server Error for create Jwt Token"
            });
        } else if (
            this.checkValidAccess === "" &&
            this.checkValidRefresh === ""
        ) {
            logger.info("Refresh Token Successfully Created");
            req.body.tokens.accessToken = this.accessToken;
            req.body.tokens.refreshToken = this.refreshToken;
            next();
        } else if (this.checkValidRefresh === "NoExistedToken") {
            if (this.checkValidAccess === "ExpiredToken") {
                logger.error("Access Token is expired.");
                res.status(401).json({
                    msg: "Access Token is expired"
                });
            } else if (this.checkValidAccess === "InvalidToken") {
                logger.error("Access Token is Invalid.");
                res.status(401).json({
                    msg: "Access Token is Invalid"
                });
            } else {
                logger.info("Access Token Successfully Verified");
                next();
            }
        } else {
            if (this.checkValidRefresh === "ExpiredToken") {
                logger.info("Refresh Token is expired");
                res.status(401).json({
                    msg: "Refresh Token is expired",
                    accessToken: "",
                    refreshToken: ""
                });
            } else if (this.checkValidRefresh === "InvalidToken") {
                logger.info("Refresh Token is Invalid");
                res.status(401).json({
                    msg: "Refresh Token is Invalid",
                    accessToken: "",
                    refreshToken: ""
                });
            } else {
                logger.info("Refresh Token Successfully Verified");
                this.accessToken = await JwtService.createAccessToken({
                    name: req.body.name
                });
                req.body.tokens.accessToken = this.accessToken;
                next();
            }
        }
    }
}

export default JwtController;
