import { Model, ModelAttributes, InitOptions } from "sequelize";
import IDao from "@src/DAO/IDao";
class ObjDao extends Model implements IDao {

    static initModel(attr: ModelAttributes, opt: InitOptions): () => Model {
        return () => this.init(attr, opt);
    }
}

export default ObjDao;
