import express, { Request, Response, Router } from "express";
import { LogService } from "../../../config/winston";
import { router as signinRouter} from "./signin";
import { router as signupRouter} from "./signup";
export const router = Router();

router.use("/signin",signinRouter);
router.use("/signup",signupRouter);
