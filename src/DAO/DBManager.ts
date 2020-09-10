import { Sequelize, ModelAttributes } from "sequelize";
import LogService from "@src/custom/LogService";
import IDao from "@src/DAO/IDao";
class DBManager {
    private readonly connection: Sequelize;

    constructor() {
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

    initModel(dao: typeof IDao, objAttr: ModelAttributes): any {
        dao.initModel(objAttr, {
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
