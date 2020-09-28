import { Model } from "sequelize";
import DBManager from "@src/models/DBManager";
import UserModel from "@src/models/UserModel";

import LogService from "@src/utils/LogService";

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
}

export default SignupDao;
