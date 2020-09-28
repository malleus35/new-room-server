import DBManager from "@src/models/DBManager";
import UserModel from "@src/models/UserModel";
import LogService from "@src/utils/LogService";

const logger = LogService.getInstance();
class SigninDao {
    static async find(email: string): Promise<UserModel | null | undefined> {
        const db = new DBManager();
        UserModel.initiate(db.getConnection());
        let user: UserModel | null = null;
        console.log(user);
        try {
            user = await UserModel.findOne({
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
        return user;
    }
}

export default SigninDao;
