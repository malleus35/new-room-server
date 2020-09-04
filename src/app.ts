import express from "express";
import { env } from "../config/dotenv";
import { LogService } from "../config/winston";
import morgan from "morgan";
import { router as apiRouter } from "./routes/index";

env.envTestConfig;

export const app = express();

app.use(express.json());
app.use(
	morgan("combined", {
		stream: { write: message => LogService.getInstance().info(message) }
	})
);
app.use("/api", apiRouter);
//extract listen method
//app.listen(process.env.PORT || 3000);
