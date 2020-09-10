import { Model, ModelAttributes, InitOptions } from "sequelize";
import IModel from "@src/DAO/iModel";
import ObjModel from "@src/DAO/objModel";
class UserModel extends ObjModel implements IModel {
    static initModel(attr: ModelAttributes, opt: InitOptions): void {
        this.init(attr, opt);
    }
}

export default UserModel;
