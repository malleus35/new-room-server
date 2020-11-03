import { Sequelize, DataTypes, InitOptions, ModelAttributes } from "sequelize";
export namespace UserModelTypes {
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
    export const attr: UserModelTypes.IUserScheme = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pwd: {
            type: DataTypes.STRING,
            allowNull: false
        },
        grade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        school: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stdNum: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
}
