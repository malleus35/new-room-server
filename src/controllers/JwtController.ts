import MiddlewareController from "@src/controllers/MiddlewareController";
import JwtService from "@src/services/middlewares/JwtService";
import LogService from "@src/utils/LogService";
import { NextFunction, Request, Response } from "express";

const logger = LogService.getInstance();
class JwtController extends MiddlewareController {
    private token: any;
    constructor() {
        super();
    }

    async doService(): Promise<void> {
        this.token = await JwtService.createToken({ name: "junghun Yang" });
        logger.info(this.token);
    }
    async doMiddlewareResponse(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        if (!this.token) {
            logger.error("Internal Server Error for create Jwt Token");
            res.status(500).json({
                msg: "Internal Server Error for create Jwt Token"
            });
        } else {
            req.body.token = this.token;
            next();
        }
    }
}

export default JwtController;
