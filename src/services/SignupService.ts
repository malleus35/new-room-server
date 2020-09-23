import { NextFunction, Request, Response } from "express";
import { Model } from "sequelize";
import { SignUpTypes } from "@src/customTypes/auth/controllers/Signup";
import DBManager from "@src/models/DBManager";
import UserModel from "@src/models/UserModel";

import LogService from "@src/utils/LogService";

const logger = LogService.getInstance();
class SignupService {
    static async isAlreadyHaveAccount(req: Request): Promise<string> {
        const signupBody: SignUpTypes.SignUpPostBody = req.body;
        const db = new DBManager();
        UserModel.init(db.getConnection());
        await UserModel.sync();

        let find: Model[] = [];
        try {
            find = await UserModel.findAll({
                where: {
                    ...signupBody
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
        UserModel.init(db.getConnection());
        if (process.env.NODE_ENV === "production") await UserModel.sync();
        else await UserModel.sync({ force: true });
        let newUser: Model | null = null;
        try {
            newUser = await UserModel.create(signupBody);
        } catch (err) {
            logger.error(err);
            return "BadRequest";
        }
        db.getConnection().close();
        if (newUser === null) return "InteralServerError";
        else return "Success";
    }
}

export default SignupService;
