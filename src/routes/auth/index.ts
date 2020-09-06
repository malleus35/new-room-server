import signinRouter from "./signin";
import signupRouter from "./signup";
import { Router } from "express";
import LogService from "../../../config/winston";

const router = Router();

router.use("/signin", signinRouter);
router.use("/signup", signupRouter);

export default router;
