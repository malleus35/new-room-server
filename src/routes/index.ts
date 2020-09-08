import { Router } from "express";
import authRouter from "@src/routes/auth";

const router = Router();

router.use("/auth", authRouter);

export default router;
