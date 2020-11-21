import LogService from "@src/utils/LogService";
import UserDao from "@src/dao/UserDao";
import serviceFactory from "@src/vo/auth/services/ServiceFactory";
import User from "@src/models/UserModel";
const logger = LogService.getInstance();
class SignupService {
    static findOne = serviceFactory.get<User>(UserDao.getInstance().findOne);
    static create = serviceFactory.postOrUpdate<User>(
        UserDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<User>(
        UserDao.getInstance().update
    );
    static delete = serviceFactory.delete<User>(UserDao.getInstance().delete);
}

export default SignupService;
