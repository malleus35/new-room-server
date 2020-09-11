import { Sequelize } from "sequelize";
import LogService from "@src/custom/LogService";

class DBManager {
    private connection: Sequelize;

    constructor() {
        this.connection = new Sequelize(
            process.env.DATABASE || "postgres",
            process.env.DB_USERNAME || "postgres",
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: "postgres",
                logging: LogService.getInstance().info.bind(
                    LogService.getLogger()
                )
            }
        );
    }

    async checkConnection(): Promise<void> {
        await this.connection
            .authenticate()
            .then(() =>
                LogService.getInstance().info(
                    "Connection has been established successfully."
                )
            )
            .catch((err) =>
                LogService.getInstance().error(
                    `Unable to connect to the database: ${err}`
                )
            );
    }
    getConnection(): Sequelize {
        return this.connection;
    }
    async close(): Promise<void> {
        await this.connection
            .close()
            .then(() => LogService.getInstance().info("Connection end"))
            .catch((err) => LogService.getInstance().error(err));
    }
}

export default DBManager;
