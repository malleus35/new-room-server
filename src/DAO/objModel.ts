import { Model, ModelAttributes, InitOptions } from "sequelize";
import IModel from "@src/DAO/IModel";
class ObjModel extends Model implements IModel {
    static initModel(attr: ModelAttributes, opt: InitOptions): void {
        this.init(attr, opt);
    }
}

export default ObjModel;
