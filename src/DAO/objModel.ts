import { Model, ModelAttributes, InitOptions } from "sequelize";
class ObjModel extends Model {
    initModel(attr: ModelAttributes, opt: InitOptions): void {
        this.init(attr, opt);
    }
}

export default ObjModel;
