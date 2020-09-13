import { Router } from "express";
import authRouter from "@src/api/auth";

const router = Router();

router.use("/auth", authRouter);

export default router;
