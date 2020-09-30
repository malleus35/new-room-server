import { Request, Response, NextFunction } from "express";
import argon2 from "argon2";

import { SignInTypes } from "@src/vo/auth/controllers/Signin";

import UserModel from "@src/models/UserModel";

import SigninDao from "@src/dao/SigninDao";
class SigninService {
    static async signin(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<string> {
        const signinBody: SignInTypes.SignInBody = req.body;
        if (!signinBody.email || !signinBody.pwd) return "BadRequest";

        const user:
            | UserModel
            | null
            | undefined = await SigninDao.getInstance().find(signinBody.email);
        switch (user) {
            case undefined:
                return "InternalServerError";
            case null:
                return "NoExistUser";
            default:
                if ((await argon2.verify(user.pwd, signinBody.pwd)) === false)
                    return "WrongPassword";
                else return "Success";
        }
    }
}

export default SigninService;
