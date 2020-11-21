import userRouter from "@src/api/auth/user";
import { Router } from "express";

const router = Router();

router.use("/user", userRouter);

export default router;
