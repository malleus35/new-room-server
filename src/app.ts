import express from "express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import env from "@src/utils/Dotenv";
import LogService from "@src/utils/LogService";
import apiRouter from "@src/api/index";
import InitController from "@src/controllers/services/InitController";

env.chooseEnv();
const app = express();

const logger = LogService.getInstance();

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    morgan("combined", {
        stream: { write: (message) => LogService.getInstance().info(message) }
    })
);
const init = new InitController().excute()();
app.use("/api", apiRouter);
if (process.env.NODE_ENV !== "test")
    app.listen(process.env.SERVER_PORT || 3000);

logger.info(`Server is running on ${process.env.SERVER_PORT || 3000}!`);
export default app;
