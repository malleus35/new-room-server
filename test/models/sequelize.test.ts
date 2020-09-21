import { DataTypes } from "sequelize";
import LogService from "@src/utils/LogService";
import env from "@src/utils/Dotenv";
import DBManager from "@src/models/DBManager";
import ObjModel from "@src/models/ObjModel";
import UserModel from "@src/models/UserModel";
import IModel from "@src/models/IModel";
import { UserModelTypes } from "@src/customTypes/auth/models/UserModel";

const logger = LogService.getInstance();
env.chooseEnv();
describe("sequelize and postgresql test", () => {
    let cntn: DBManager;
    let attr: UserModelTypes.IUserScheme;

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
        ObjModel.init(attr, {
            sequelize: cntn.getConnection(),
            tableName: "Obj"
        });
        expect(ObjModel).toBe(cntn.getConnection().models.ObjModel);
    });
    it("test to make model form of class extends", async () => {
        let mUserModel: any;
        jest.spyOn(UserModel, "init").mockResolvedValue(mUserModel);
        UserModel.init(attr, {
            sequelize: cntn.getConnection(),
            tableName: "User"
        });
        expect(mUserModel).toBe(cntn.getConnection().models.UserModel);
        expect(UserModel.init).toBeCalledWith(attr, {
            sequelize: cntn.getConnection(),
            tableName: "User"
        });
    });

    it("Test sync to syncronize database", async () => {
        let mUserModel: any;
        let mUserModelSync: any;
        jest.spyOn(UserModel, "init").mockResolvedValueOnce(mUserModel);
        UserModel.init(attr, {
            sequelize: cntn.getConnection(),
            tableName: "User"
        });
        expect(mUserModel).toBe(cntn.getConnection().models.UserModel);
        jest.spyOn(UserModel, "sync").mockResolvedValue(mUserModelSync);
        await UserModel.sync();
        expect(UserModel.sync).toBeCalledTimes(1);
    });

    it("Test create Table row", async () => {
        let mUserModel: any;
        jest.spyOn(UserModel, "init").mockResolvedValueOnce(mUserModel);
        UserModel.init(attr, {
            sequelize: cntn.getConnection(),
            tableName: "User"
        });
        expect(mUserModel).toBe(cntn.getConnection().models.UserModel);
        await UserModel.sync();
        // const junghun = await UserModel.create({
        //     name: "junghun",
        //     email: "maestroprog@seoultech.ac.kr",
        //     pwd: "didwjdgns1",
        //     grade: 4,
        //     school: "seoultech",
        //     stdNum: "15109342"
        // });
        // expect(junghun instanceof UserModel).toBeTruthy();
        // expect(junghun.name).toEqual("junghun");
    });

    it("Test create user with mock", async () => {
        let mUser: UserModel;
        jest.spyOn(UserModel, "create").mockResolvedValueOnce(mUser);
        const name = "junghun";
        const email = "maestroprog@seoultech.ac.kr";
        const pwd = "didwjdgns1";
        const grade = 4;
        const school = "seoultech";
        const stdNum = "15109342";
        await UserModel.create({
            name,
            email,
            pwd,
            grade,
            school,
            stdNum
        });
        expect(UserModel.create).toBeCalledWith({
            name,
            email,
            pwd,
            grade,
            school,
            stdNum
        });
    });
});
