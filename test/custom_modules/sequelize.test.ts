import { Sequelize, DataTypes, Model } from "sequelize";
import LogService from "../../src/custom_modules/winston";
import env from "../../src/custom_modules/dotenv";

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
});
