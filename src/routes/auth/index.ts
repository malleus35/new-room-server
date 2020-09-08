import signinRouter from "@src/routes/auth/signin";
import signupRouter from "@src/routes/auth/signup";
import { Router } from "express";

const router = Router();

router.use("/signin", signinRouter);
router.use("/signup", signupRouter);

export default router;
