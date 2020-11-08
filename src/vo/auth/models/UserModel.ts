import { Sequelize, DataTypes, InitOptions, ModelAttributes } from "sequelize";
export namespace UserModelTypes {
    export interface IBaseUserTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        primaryKey?: boolean;
    }
    export interface IUserScheme extends ModelAttributes {
        email: IColumnOption;
        name: IColumnOption;
        pwd: IColumnOption;
        grade: IColumnOption;
        school: IColumnOption;
        stdNum: IColumnOption;
    }
    export const attr: UserModelTypes.IUserScheme = {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
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
