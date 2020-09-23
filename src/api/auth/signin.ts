import { Request, Response, Router } from "express";
import SignInController from "@src/controllers/services/signin/SigninController";
const router = Router();

router.post("/", new SignInController().getController());

export default router;
