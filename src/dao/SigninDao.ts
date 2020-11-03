import AuthDBManager from "@src/models/AuthDBManager";
import User from "@src/models/UserModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
const logger = LogService.getInstance();
class SigninDao extends Dao {
    private constructor() {
        super();
    }
    protected async connect() {
        this.db = new AuthDBManager();
        User.initiate(this.db.getConnection());
        await User.sync();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(email: string): Promise<User | null | undefined> {
        await this.connect();
        let user: User | null = null;
        console.log(user);
        try {
            user = await User.findOne({
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
