import express from "express";
import morgan from "morgan";
import env from "../config/dotenv";
import LogService from "../config/winston";
import apiRouter from "./routes/index";

env.chooseEnv();
const app = express();

app.use(express.json());
app.use(
    morgan("combined", {
        stream: { write: (message) => LogService.getInstance().info(message) }
    })
);
app.use("/api", apiRouter);
if (process.env.NODE_ENV !== "test") app.listen(process.env.PORT || 3000);

export default app;
