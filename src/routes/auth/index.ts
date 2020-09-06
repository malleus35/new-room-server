import express, { Request, Response, Router } from "express";
import LogService from "../../../config/winston";
import signinRouter from "./signin";
import signupRouter from "./signup";

const router = Router();

router.use("/signin", signinRouter);
router.use("/signup", signupRouter);

export default router;
