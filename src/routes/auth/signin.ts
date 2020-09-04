import express, { Request, Response, Router } from "express";
import { LogService } from "../../../config/winston";

export const router = Router();
const logger = LogService.getInstance();

router.post("/", (req: Request, res: Response) => {
	const { id, pwd } = req.body;
	logger.info("Login Success!");
	res.json({ msg: "Login Success!" });
});
