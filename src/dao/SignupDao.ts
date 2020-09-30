import { Model } from "sequelize";
import argon2 from "argon2";

import AuthDBManager from "@src/models/AuthDBManager";
import UserModel from "@src/models/UserModel";

import LogService from "@src/utils/LogService";

import { SignUpTypes } from "@src/vo/auth/controllers/Signup";

const logger = LogService.getInstance();

class SignupDao {
    static async find(email: string): Promise<Model | null | undefined> {
        const db = new AuthDBManager();
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
            await db.endConnection();
            return undefined;
        }
        await db.endConnection();
        return find;
    }

    static async save(
        userData: SignUpTypes.SignUpPostBody
    ): Promise<UserModel | undefined> {
        const db = new AuthDBManager();
        UserModel.initiate(db.getConnection());
        if (process.env.NODE_ENV === "test")
            await UserModel.sync({ force: true });
        else await UserModel.sync();

        let newUser: UserModel | null = null;
        userData.pwd = await argon2.hash(userData.pwd);
        try {
            newUser = await UserModel.create(userData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        await db.endConnection();
        return newUser;
    }
}

export default SignupDao;
