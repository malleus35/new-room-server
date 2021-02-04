import LogService from "@src/utils/LogService";
import UserDao from "@src/dao/UserDao";
import serviceFactory from "@src/vo/auth/services/ServiceFactory";
import User from "@src/models/UserModel";
const logger = LogService.getInstance();
class UserService {
    static findOne = serviceFactory.get<User>(UserDao.getInstance().findOne);
    static findSignIn = serviceFactory.signin<User>(
        UserDao.getInstance().findOne
    );
    static findMyInfo = serviceFactory.get<User>(
        UserDao.getInstance().findMyInfo
    );
    static create = serviceFactory.postOrUpdate<User>(
        UserDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<User>(
        UserDao.getInstance().update
    );
    static delete = serviceFactory.delete<User>(UserDao.getInstance().delete);
}

export default UserService;
