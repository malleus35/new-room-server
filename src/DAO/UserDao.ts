import { Model } from "sequelize";
import IDao from "@src/DAO/IDao";
import ObjDao from "@src/DAO/ObjDao";
import { UserDaoTypes } from "@customTypes/auth/UserDao";
class UserDao extends ObjDao {
    static init(
        attr: UserDaoTypes.IUserScheme,
        opt: UserDaoTypes.IBaseUserTableOptions
    ): Model {
        return super.init(attr, opt);
    }

    static sync() {
        return super.sync();
    }
}

export default UserDao;
