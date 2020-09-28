import { Model } from "sequelize";
import argon2 from "argon2";

import DBManager from "@src/models/DBManager";
import UserModel from "@src/models/UserModel";

import LogService from "@src/utils/LogService";

import { SignUpTypes } from "@src/customTypes/auth/controllers/Signup";

const logger = LogService.getInstance();

class SignupDao {
    static async find(email: string): Promise<Model | null | undefined> {
        const db = new DBManager();
        UserModel.initiate(db.getConnection());
        let find: Model | null = null;
        try {
            find = await UserModel.findOne({
                where: {
                    email: email
                }
            });
        } catch (err) {
            logger.error(err);
            db.getConnection().close();
            return undefined;
        }
        db.getConnection().close();
        return find;
    }

    static async save(
        userData: SignUpTypes.SignUpPostBody
    ): Promise<UserModel | undefined> {
        const db = new DBManager();
        UserModel.initiate(db.getConnection());
        if (process.env.NODE_ENV === "test")
            await UserModel.syncDB({ force: true });

        let newUser: UserModel | null = null;
        userData.pwd = await argon2.hash(userData.pwd);
        try {
            newUser = await UserModel.createUser(userData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        db.getConnection().close();
        return newUser;
    }
}

export default SignupDao;
