import signinRouter from "@src/api/auth/signin";
import signupRouter from "@src/api/auth/signup";
import { Router } from "express";

const router = Router();

router.use("/signin", signinRouter);
router.use("/signup", signupRouter);

export default router;
