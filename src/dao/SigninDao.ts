import AuthDBManager from "@src/models/AuthDBManager";
import User from "@src/models/UserModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { AuthReqData } from "@src/vo/auth/services/reqData";
import { ValidationError } from "sequelize";
const logger = LogService.getInstance();
class SigninDao extends Dao {
    private constructor() {
        super();
        this.db = AuthDBManager.getInstance();
    }
    protected async connect() {
        this.db = await AuthDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async findOne({
        data,
        decoded,
        params
    }: AuthReqData): Promise<User | string | null | undefined> {
        let user: User | null = null;
        try {
            user = await User.findOne({
                where: {
                    email: data.email
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return user;
    }
}

export default SigninDao;
