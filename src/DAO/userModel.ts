import { Model, ModelAttributes, InitOptions } from "sequelize";
class UserModel extends Model {
    initModel(attr: ModelAttributes, opt: InitOptions): void {
        this.init(attr, opt);
    }
}

export default UserModel;
