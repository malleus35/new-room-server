import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { router as indexRouter } from "./routes/index";

dotenv.config({
	path: path.join(__dirname, "/envs/.env.production")
});

export const app = express();
app.use(express.json());

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
