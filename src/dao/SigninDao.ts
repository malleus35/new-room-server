import AuthDBManager from "@src/models/AuthDBManager";
import UserModel from "@src/models/UserModel";
import LogService from "@src/utils/LogService";

const logger = LogService.getInstance();
class SigninDao {
    private static instance: SigninDao;
    private db: AuthDBManager | undefined;

    private constructor() {}
    private static setSingleton(): void {
        if (SigninDao.instance == null) SigninDao.instance = new SigninDao();
    }
    static getInstance(): SigninDao {
        if (SigninDao.instance == null) SigninDao.setSingleton();
        return this.instance;
    }
    private connect() {
        this.db = new AuthDBManager();
        UserModel.initiate(this.db.getConnection());
    }

    private async endConnect() {
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
