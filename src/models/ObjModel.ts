import { Model, ModelAttributes, InitOptions } from "sequelize";
import IModel from "@src/models/IModel";
class ObjModel extends Model {
    static init(attr: ModelAttributes, opt: InitOptions): Model {
        return super.init(attr, opt);
    }

    static sync() {
        return super.sync();
    }

    static create(value: any) {
        return super.create(value);
    }
}

export default ObjModel;
