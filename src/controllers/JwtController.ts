import MiddlewareController from "@src/controllers/MiddlewareController";
import JwtService from "@src/services/middlewares/JwtService";
import LogService from "@src/utils/LogService";
import { NextFunction, Request, Response } from "express";

const logger = LogService.getInstance();
class JwtController extends MiddlewareController {
    private token: string | unknown;
    private isValid: boolean;
    constructor() {
        super();
        this.isValid = true;
    }

    async doService(req, res, next): Promise<void> {
        if (req.body.token === "" || req.body.token == null) {
            this.token = await JwtService.createToken({ name: "junghun Yang" });
        } else {
            this.token = req.body.token;
            const checkValid = await JwtService.verifyToken(this.token);
            if (!checkValid) this.isValid = false;
        }
        logger.info(this.token);
    }
    async doMiddlewareResponse(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        if (!this.token || this.token === "") {
            logger.error("Internal Server Error for create Jwt Token.");
            res.status(500).json({
                msg: "Internal Server Error for create Jwt Token"
            });
        } else if (!this.isValid) {
            logger.error("This Token is not valid.");
            res.status(401).json({
                msg: "This Token is not valid"
            });
        } else {
            logger.info("Token Successfully created");
            req.body.token = this.token;
            next();
        }
    }
}

export default JwtController;
