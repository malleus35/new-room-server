import { ModelAttributes, InitOptions } from "sequelize";
import IModel from "@src/DAO/IModel";
import ObjModel from "@src/DAO/ObjModel";
class UserModel extends ObjModel implements IModel {
    static initModel(attr: ModelAttributes, opt: InitOptions): void {
        this.init(attr, opt);
    }
}

export default UserModel;
