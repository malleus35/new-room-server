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

    beforeAll(async () => {
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
        await cntn.getConnection().sync({ force: true });
    });
    afterAll(() => {
        cntn.close();
    });

    it("make sequelize and connect database to another rule", async () => {
        //Log 내용 테스트 추가 필요?
        let seqTest: DBManager;
        jest.spyOn(cntn, "checkConnection").mockResolvedValue(seqTest);
        await cntn.checkConnection();
        expect(cntn.checkConnection).toBeCalledTimes(1);
    });

    it("test to make model form of class", async () => {
        ObjDao.init(attr, {
            sequelize: cntn.getConnection(),
            tableName: "Obj"
        });
        expect(ObjDao).toBe(cntn.getConnection().models.ObjDao);
    });
    it("test to make model form of class extends", async () => {
        let mUserDao: any;
        jest.spyOn(UserDao, "init").mockResolvedValue(mUserDao);
        UserDao.init(attr, {
            sequelize: cntn.getConnection(),
            tableName: "User"
        });
        expect(mUserDao).toBe(cntn.getConnection().models.UserDao);
        expect(UserDao.init).toBeCalledWith(attr, {
            sequelize: cntn.getConnection(),
            tableName: "User"
        });
    });

    it("Test sync to syncronize database", async () => {
        let mUserDao: any;
        let mUserDaoSync: any;
        jest.spyOn(UserDao, "init").mockResolvedValueOnce(mUserDao);
        UserDao.init(attr, {
            sequelize: cntn.getConnection(),
            tableName: "User"
        });
        expect(mUserDao).toBe(cntn.getConnection().models.UserDao);
        jest.spyOn(UserDao, "sync").mockResolvedValue(mUserDaoSync);
        await UserDao.sync();
        expect(UserDao.sync).toBeCalledTimes(1);
    });

    it("Test create Table row", async () => {
        let mUserDao: any;
        jest.spyOn(UserDao, "init").mockResolvedValueOnce(mUserDao);
        UserDao.init(attr, {
            sequelize: cntn.getConnection(),
            tableName: "User"
        });
        expect(mUserDao).toBe(cntn.getConnection().models.UserDao);
        await UserDao.sync();
        const junghun = await UserDao.create({
            name: "junghun",
            email: "maestroprog@seoultech.ac.kr",
            pwd: "didwjdgns1",
            grade: 4,
            school: "seoultech",
            stdNum: "15109342"
        });
        expect(junghun instanceof UserDao).toBeTruthy();
        expect(junghun.name).toEqual("junghun");
    });

    it("Test create user with mock", async () => {
        let mUser: UserDao;
        jest.spyOn(UserDao, "create").mockResolvedValueOnce(mUser);
        const name = "junghun";
        const email = "maestroprog@seoultech.ac.kr";
        const pwd = "didwjdgns1";
        const grade = 4;
        const school = "seoultech";
        const stdNum = "15109342";
        await UserDao.create({
            name,
            email,
            pwd,
            grade,
            school,
            stdNum
        });
        expect(UserDao.create).toBeCalledWith({
            name,
            email,
            pwd,
            grade,
            school,
            stdNum
        });
    });
});
