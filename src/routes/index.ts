import express, { Request, Response, Router } from "express";

export const router =Router();

router.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

router.get("/signin", (req: Request, res: Response) => {
	const { id, pwd } = req.body;
	res.json({ msg: "Login Success!" });
});
