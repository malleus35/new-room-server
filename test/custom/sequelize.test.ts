import { DataTypes } from "sequelize";
import LogService from "@src/custom/LogService";
import env from "@src/custom/dotenv";
import DBManager from "@src/DAO/DBManager";
import ObjDao from "@src/DAO/ObjDao";
import UserDao from "@src/DAO/UserDao";
import IDao from "@src/DAO/IDao";
import { UserDaoTypes } from "@src/customTypes/auth/UserDao";

const logger = LogService.getInstance();
env.chooseEnv();
describe("sequelize and postgresql test", () => {
    let cntn: DBManager;
    let attr: UserDaoTypes.IUserScheme;

    beforeAll(() => {
        cntn = new DBManager();
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
    });
    afterAll(() => {
        cntn.close();
    });

    it("make sequelize and connect database to another rule", async () => {
        //Log 내용 테스트 추가 필요?
        await cntn.checkConnection();
    });

    it("test to make model form of class", async () => {
        ObjDao.init(attr, {
            sequelize: cntn.getConnection(),
            tableName: "Obj"
        });
        expect(ObjDao).toBe(cntn.getConnection().models.ObjDao);
    });
    it("test to make model form of class extends", async () => {
        UserDao.init(attr, {
            sequelize: cntn.getConnection(),
            tableName: "User"
        });
        expect(UserDao).toBe(cntn.getConnection().models.UserDao);
    });

    it("Test sync to syncronize database", async () => {
        UserDao.init(attr, {
            sequelize: cntn.getConnection(),
            tableName: "User"
        });
        expect(UserDao).toBe(cntn.getConnection().models.UserDao);
        await UserDao.sync();
        // expect(2).toEqual(1);
    });
});
