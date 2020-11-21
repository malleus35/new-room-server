import User from "@src/models/UserModel";
import UserDao from "@src/dao/UserDao";
import serviceFactory from "@src/vo/auth/services/ServiceFactory";
class SigninService {
    static findOne = serviceFactory.signin<User>(UserDao.getInstance().findOne);
}

export default SigninService;
