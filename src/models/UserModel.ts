import { Model } from "sequelize";
import IModel from "@src/models/IModel";
import ObjModel from "@src/models/ObjModel";
import { UserModelTypes } from "@src/customTypes/auth/models/UserModel";
class UserModel extends ObjModel {
    static init(
        attr: UserModelTypes.IUserScheme,
        opt: UserModelTypes.IBaseUserTableOptions
    ): Model {
        return super.init(attr, opt);
    }

    static sync() {
        return super.sync();
    }

    static create(value: UserModelTypes.IUserScheme) {
        return super.create(value);
    }
}

export default UserModel;
