import { Sequelize, DataTypes, InitOptions, ModelAttributes } from "sequelize";
export namespace UserDaoTypes {
    export interface IBaseUserTableOptions extends InitOptions {
        sequelize: Sequelize;

        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
    }
    export interface IUserScheme extends ModelAttributes {
        name: IColumnOption;
        email: IColumnOption;
        pwd: IColumnOption;
        grade: IColumnOption;
        school: IColumnOption;
        stdNum: IColumnOption;
    }
}
