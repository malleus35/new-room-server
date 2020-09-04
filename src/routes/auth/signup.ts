import express, { Request, Response, Router } from "express";
import { LogService } from "../../../config/winston";

export const router = Router();

const logger = LogService.getInstance();

router.post("/", (req: Request, res: Response) => {
	const { id, pwd, grade, school, stdNum } = req.body;
	logger.info("Signup Success!");
	res.json({ msg: "Signup Success!" });
});
