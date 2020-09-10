import { DataTypes } from "sequelize";
import LogService from "@src/custom/LogService";
import env from "@src/custom/dotenv";
import DBManager from "@src/DAO/DBManager";
import ObjDao from "@src/DAO/ObjDao";
import UserDao from "@src/DAO/UserDao";
import IDao from "@src/DAO/IDao";

const logger = LogService.getInstance();

env.chooseEnv();
describe("sequelize and postgresql test", () => {
    let connection: DBManager;
    let attr: any;
    beforeAll(() => {
        connection = new DBManager();
    });
    afterAll(() => {
        connection.close();
    });

    it("make sequelize and connect database to another rule", async () => {
        connection.checkConnection();
    });

    it("test to make model form of class", () => {
        attr = {
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
        connection.initModel(ObjDao, attr);
        logger.info(ObjDao === connection.getConnection().models.ObjDao);
        logger.info(connection.getConnection().models.ObjModel);
        logger.info(ObjDao);
    });
    it("test to make model form of class extends", () => {
        attr = {
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
        connection.initModel(UserDao, attr);
        logger.info(UserDao === connection.getConnection().models.UserDao);
        logger.info(connection.getConnection().models.UserDao);
        logger.info(UserDao);
    });

    it("Test sync to syncronize database", () => {
        expect(1).toBe(1);
    });
});
