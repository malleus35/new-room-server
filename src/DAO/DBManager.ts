import { Sequelize, ModelAttributes, Model } from "sequelize";
import LogService from "@src/custom/LogService";
import IDao from "@src/DAO/IDao";
class DBManager {
    private readonly connection: Sequelize;

    constructor() {
        this.connection = new Sequelize(
            process.env.DATABASE || "postgres",
            process.env.DB_USERNAME || "postgres",
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: process.env.DB_DIALECT || "postgres",
                logging: LogService.getInstance().info.bind(
                    LogService.getLogger()
                )
            }
        );
    }

    async checkConnection(): Promise<void> {
        try {
            await this.connection.authenticate();
            LogService.getInstance().info(
                "Connection has been established successfully."
            );
        } catch (error) {
            LogService.getInstance().error(
                `Unable to connect to the database: ${error}`
            );
        }
    }

    initModel(dao: typeof IDao, objAttr: ModelAttributes): () => Model {
        return (): Model => dao.initModel(objAttr, {
            sequelize: this.connection,
            freezeTableName: true
        });
    }
    getConnection(): Sequelize {
        return this.connection;
    }
    close(): Promise<void> {
        return this.connection.close();
    }
}

export default DBManager;
