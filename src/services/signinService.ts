import { Request, Response, NextFunction } from "express";
import argon2 from "argon2";

import { SignInTypes } from "@src/customTypes/auth/controllers/Signin";
import DBManager from "@src/models/DBManager";
import UserModel from "@src/models/UserModel";
import LogService from "@src/utils/LogService";

const logger = LogService.getInstance();
class SigninService {
    static async signin(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<string> {
        const signinBody: SignInTypes.SignInBody = req.body;
        const db = new DBManager();
        UserModel.initiate(db.getConnection());
        if (!signinBody.email || !signinBody.pwd) return "BadRequest";
        let user: UserModel | null | any = null;

        try {
            user = await UserModel.findOne({
                where: {
                    email: signinBody.email
                }
            });
        } catch (err) {
            logger.error(err);
            return "InteralServerError";
        }
        db.getConnection().close();
        if (user === null) return "NoExistUser";
        else if ((await argon2.verify(user.pwd, signinBody.pwd)) === false)
            return "WrongPassword";
        else return "Success";
    }
}

export default SigninService;
