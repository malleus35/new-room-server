import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    ModelValidateOptions
} from "sequelize";
export namespace UserModelTypes {
    export interface IBaseUserTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        primaryKey?: boolean;
        validate?: ModelValidateOptions;
    }
    export interface IUserScheme extends ModelAttributes {
        email: IColumnOption;
        name: IColumnOption;
        pwd: IColumnOption;
        // grade: IColumnOption;
        school: IColumnOption;
        stdNum: IColumnOption;
    }
    export const attr: UserModelTypes.IUserScheme = {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        pwd: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        // grade: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        school: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        stdNum: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isNumeric: true
            }
        }
    };
}
