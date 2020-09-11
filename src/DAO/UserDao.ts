import { Model } from "sequelize";
import IDao from "@src/DAO/IDao";
import ObjDao from "@src/DAO/ObjDao";
import { UserDaoTypes } from "@src/customTypes/auth/UserDao";
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

    static create(value: UserDaoTypes.IUserScheme) {
        return super.create(value);
    }
}

export default UserDao;
