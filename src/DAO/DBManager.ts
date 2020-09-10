import { Sequelize, ModelAttributes } from "sequelize";
import LogService from "@src/custom/LogService";
import IModel from "@src/DAO/IModel";
class DBManager {
    private readonly connection: Sequelize;

    // 테이블에 관련된 프로퍼티를 가진다.
    // 가진 테이블객체에게

    private objAttr: ModelAttributes;
    constructor(objAttr: ModelAttributes) {
        this.objAttr = objAttr;
        this.connection = new Sequelize(
            process.env.DATABASE,
            process.env.DB_USERNAME,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: process.env.DB_DIALECT,
                logging: LogService.getInstance().info.bind(
                    LogService.getLogger()
                )
            }
        );
    }

    async checkConnection(): void {
        try {
            await this.connection.authenticate();
            LogService.getInstance().info(
                "Connection has been established successfully."
            );
        } catch (error: Error) {
            LogService.getInstance().error(
                `Unable to connect to the database: ${error}`
            );
        }
    }

    initModel(model: typeof IModel): any {
        model.initModel(this.objAttr, {
            sequelize: this.connection,
            freezeTableName: true
        });
    }
    getConnection() {
        return this.connection;
    }
    close(): void {
        this.connection.close();
    }
}

export default DBManager;
