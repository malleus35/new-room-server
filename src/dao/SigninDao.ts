import AuthDBManager from "@src/models/AuthDBManager";
import UserModel from "@src/models/UserModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
const logger = LogService.getInstance();
class SigninDao extends Dao {
    private constructor() {
        super();
    }
    protected connect() {
        this.db = new AuthDBManager();
        UserModel.initiate(this.db.getConnection());
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(email: string): Promise<UserModel | null | undefined> {
        this.connect();
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
            await this.endConnect();
            return undefined;
        }
        await this.endConnect();
        return user;
    }
}

export default SigninDao;
