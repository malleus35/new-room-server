import { NextFunction, Request, Response } from "express";
import { Model } from "sequelize";
import argon2 from "argon2";

import { SignUpTypes } from "@src/customTypes/auth/controllers/Signup";
import DBManager from "@src/models/DBManager";
import UserModel from "@src/models/UserModel";

import LogService from "@src/utils/LogService";

const logger = LogService.getInstance();
class SignupService {
    static async isAlreadyHaveAccount(req: Request): Promise<string> {
        const signupBody: SignUpTypes.SignUpPostBody = req.body;
        const db = new DBManager();
        UserModel.initiate(db.getConnection());
        if (
            !signupBody.name ||
            !signupBody.email ||
            !signupBody.pwd ||
            !signupBody.grade ||
            !signupBody.school ||
            !signupBody.stdNum
        )
            return "BadRequest";
        let find: Model[] = [];
        try {
            find = await UserModel.findAll({
                where: {
                    email: signupBody.email
                }
            });
        } catch (err) {
            logger.error(err);
            db.getConnection().close();
            return "InternalServerError";
        }
        db.getConnection().close();
        if (find.length !== 0) return "AlreadyExistUser";
        else return "SuccessSignUp";
    }

    static async signup(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<string> {
        const signupBody: SignUpTypes.SignUpPostBody = req.body;
        const db = new DBManager();
        UserModel.initiate(db.getConnection());
        if (process.env.NODE_ENV === "test")
            await UserModel.syncDB({ force: true });

        if (
            !signupBody.name ||
            !signupBody.email ||
            !signupBody.pwd ||
            !signupBody.grade ||
            !signupBody.school ||
            !signupBody.stdNum
        )
            return "BadRequest";
        let newUser: Model | null = null;
        signupBody.pwd = await argon2.hash(signupBody.pwd);
        console.log(signupBody);
        try {
            newUser = await UserModel.createUser(signupBody);
        } catch (err) {
            logger.error(err);
            return "InteralServerError";
        }
        db.getConnection().close();
        if (newUser === null) return "InteralServerError";
        else return "Success";
    }
}

export default SignupService;
