import { NextFunction, Request, Response } from "express";

import { SignUpTypes } from "@src/vo/auth/controllers/Signup";

import LogService from "@src/utils/LogService";

const logger = LogService.getInstance();

import SignupDao from "@src/dao/SignupDao";
class SignupService {
    static async isAlreadyHaveAccount(req: Request): Promise<string> {
        const signupBody: SignUpTypes.SignUpBody = req.body;
        if (
            !signupBody.email ||
            !signupBody.pwd ||
            !signupBody.name ||
            !signupBody.grade ||
            !signupBody.school ||
            !signupBody.stdNum
        )
            return "BadRequest";
        const find = await SignupDao.getInstance().findByPK(signupBody.email);
        switch (find) {
            case undefined:
                return "InternalServerError";
            default:
                if (find !== null) return "AlreadyExistUser";
                else return "SuccessSignUp";
        }
    }

    static async signup(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<string> {
        const signupBody: SignUpTypes.SignUpBody = req.body;
        if (
            !signupBody.email ||
            !signupBody.pwd ||
            !signupBody.name ||
            !signupBody.grade ||
            !signupBody.school ||
            !signupBody.stdNum
        )
            return "BadRequest";

        const newUser = await SignupDao.getInstance().save(signupBody);
        switch (newUser) {
            case undefined:
                return "InteralServerError";
            default:
                return "Success";
        }
    }
}

export default SignupService;
