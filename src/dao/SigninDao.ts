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
            await db.endConnection();
            return undefined;
        }
        await db.endConnection();
        return user;
    }
}

export default SigninDao;
