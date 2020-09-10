import { Sequelize, DataTypes, Model } from "sequelize";
import LogService from "@src/custom/LogService";
import env from "@src/custom/dotenv";
import DBManager from "@src/DAO/DBManager";
import ObjModel from "@src/DAO/ObjModel";
import UserModel from "@src/DAO/UserModel";
import IModel from "@src/DAO/IModel";

const logger = LogService.getInstance();

env.chooseEnv();
describe("sequelize and postgresql test", () => {
    let sequelize: Sequelize;
    beforeEach(() => {
        sequelize = new Sequelize(
            process.env.DATABASE,
            process.env.DB_USERNAME,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: process.env.DB_DIALECT,
                logging: logger.info.bind(logger)
            }
        );
    });
    afterEach(() => {
        sequelize.close();
    });

    it("make sequelize and connect database to another rule", async () => {
        try {
            await sequelize.authenticate();
            logger.info("Connection has been established successfully.");
        } catch (error: Error) {
            logger.error(`Unable to connect to the database: ${error}`);
        }
    });

    it("Test to make new User model", async () => {
        class User extends Model {}

        User.init(
            {
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
            },
            {
                sequelize,
                freezeTableName: true
            }
        );
        logger.info(`${User === sequelize.models.User}`);
    });

    it("test to make model form of class extends", () => {
        const attr = {
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

        const connection = new DBManager(attr);
        connection.initModel(UserModel);
        console.log(UserModel === connection.getConnection().models.UserModel);
        console.log(connection.getConnection().models.UserModel);
        console.log(UserModel);
    });

    it("test to make model form of class", () => {
        const attr = {
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

        const connection = new DBManager(attr);
        connection.initModel(ObjModel);
        console.log(ObjModel === connection.getConnection().models.ObjModel);
        console.log(connection.getConnection().models.ObjModel);
        console.log(ObjModel);
    });
});
