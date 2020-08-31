import express, { Request, Response } from "express";
import {env} from "../config/dotenv";
import {logger} from "../config/winston";
import morgan from "morgan";
import { router as indexRouter } from "./routes/index";


env.envTestConfig

export const app = express();

app.use(express.json());
app.use(
	morgan("combined", { stream: { write: message => logger.info(message) } })
);
app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
