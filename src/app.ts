import express from "express";
import morgan from "morgan";
import env from "@src/utils/Dotenv";
import LogService from "@src/utils/LogService";
import apiRouter from "@src/api/index";

env.chooseEnv();
const app = express();

const logger = LogService.getInstance();

app.use(express.json());
app.use(
    morgan("combined", {
        stream: { write: (message) => LogService.getInstance().info(message) }
    })
);
app.use("/api", apiRouter);
if (process.env.NODE_ENV !== "test")
    app.listen(process.env.SERVER_PORT || 3000);

logger.info(`Server is running on ${process.env.SERVER_PORT || 3000}!`);
export default app;
