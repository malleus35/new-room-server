import { Model } from "sequelize";
import argon2 from "argon2";

import AuthDBManager from "@src/models/AuthDBManager";
import UserModel from "@src/models/UserModel";

import LogService from "@src/utils/LogService";

import { SignUpTypes } from "@src/vo/auth/controllers/Signup";

const logger = LogService.getInstance();

class SignupDao {
    private static instance: SignupDao;
    private db: AuthDBManager | undefined;

    private constructor() {}
    private static setSingleton(): void {
        if (SignupDao.instance == null) SignupDao.instance = new SignupDao();
    }
    static getInstance(): SignupDao {
        if (SignupDao.instance == null) SignupDao.setSingleton();
        return this.instance;
    }
    private connect() {
        this.db = new AuthDBManager();
        UserModel.initiate(this.db.getConnection());
    }

    private async endConnect() {
        await this.db?.endConnection();
    }
    async find(email: string): Promise<Model | null | undefined> {
        this.connect();
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
        this.connect();
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
