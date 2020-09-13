import env from "@src/custom/dotenv";
import jwt from "jsonwebtoken";
import { Router } from "express";
import LogService from "@src/custom/LogService";

const logger = LogService.getInstance();
env.chooseEnv();
class Webtoken {
    constructor() {}

    static createToken(payload, options): string {
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
        return token;
    }

    static verifyToken(token): object | null {
        let validToken: object;
        try {
            validToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            logger.error(err);
            return null;
        }
        return validToken;
    }

    // static decode(token): object | null {
    //     let decoded = this.verifyToken(token);
    //     if (!decoded) return null;
    //     return decoded;
    // }
}
export default Webtoken;
