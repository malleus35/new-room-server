import express, { Request, Response, Router } from "express";
import {logger} from "../../config/winston"
export const router = Router();

router.get("/", (req: Request, res: Response) => {
logger.debug("TEST DEBUG");
	res.send("Hello World!");
});

router.get("/signin", (req: Request, res: Response) => {
	const { id, pwd } = req.body;
	res.json({ msg: "Login Success!" });
});
