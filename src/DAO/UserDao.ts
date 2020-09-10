import { ModelAttributes, InitOptions } from "sequelize";
import IDao from "@src/DAO/IDao";
import ObjDao from "@src/DAO/ObjDao";
class UserDao extends ObjDao implements IDao {
    static initModel(attr: ModelAttributes, opt: InitOptions): void {
        this.init(attr, opt);
    }
}

export default UserDao;
