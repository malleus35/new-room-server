import { NextFunction, Request, Response } from "express";
import { Model } from "sequelize";
import argon2 from "argon2";

import { SignUpTypes } from "@src/customTypes/auth/controllers/Signup";
import DBManager from "@src/models/DBManager";
import UserModel from "@src/models/UserModel";

import LogService from "@src/utils/LogService";

const logger = LogService.getInstance();

import SignupDao from "@src/dao/SignupDao";
class SignupService {
    static async isAlreadyHaveAccount(req: Request): Promise<string> {
        const signupBody: SignUpTypes.SignUpPostBody = req.body;
        if (
            !signupBody.name ||
            !signupBody.email ||
            !signupBody.pwd ||
            !signupBody.grade ||
            !signupBody.school ||
            !signupBody.stdNum
        )
            return "BadRequest";
        const find = await SignupDao.find(signupBody.email);
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
        const signupBody: SignUpTypes.SignUpPostBody = req.body;
        if (
            !signupBody.name ||
            !signupBody.email ||
            !signupBody.pwd ||
            !signupBody.grade ||
            !signupBody.school ||
            !signupBody.stdNum
        )
            return "BadRequest";

        const newUser = await SignupDao.save(signupBody);
        switch (newUser) {
            case undefined:
                return "InteralServerError";
            default:
                return "Success";
        }
    }
}

export default SignupService;
