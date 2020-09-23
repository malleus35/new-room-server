import { Router } from "express";
import SignupController from "@src/controllers/services/signup/SignupController";
import CheckValidAccountController from "@src/controllers/services/signup/CheckAlreadyHaveAccountController";
const router = Router();

router.post(
    "/",
    new CheckValidAccountController().getController(),
    new SignupController().getController()
);

export default router;
