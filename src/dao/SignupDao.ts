import { Model } from "sequelize";
import argon2 from "argon2";

import AuthDBManager from "@src/models/AuthDBManager";
import UserModel from "@src/models/UserModel";

import LogService from "@src/utils/LogService";

import { SignUpTypes } from "@src/vo/auth/controllers/Signup";
import Dao from "./Dao";

const logger = LogService.getInstance();

class SignupDao extends Dao {
    constructor() {
        super();
    }

    protected async connect() {
        this.db = new AuthDBManager();
        UserModel.initiate(this.db.getConnection());
        await UserModel.sync();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(email: string): Promise<Model | null | undefined> {
        await this.connect();
        let find: Model | null = null;
        try {
            find = await UserModel.findOne({
                where: {
                    email: email
                }
            });
        } catch (err) {
            logger.error(err);
            await this.endConnect();
            return undefined;
        }
        await this.endConnect();
        return find;
    }

    async save(
        userData: SignUpTypes.SignUpPostBody
    ): Promise<UserModel | undefined> {
        await this.connect();
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
        await this.endConnect();
        return newUser;
    }
}

export default SignupDao;
