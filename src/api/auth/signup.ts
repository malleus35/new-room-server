import { Router } from "express";
import SignupController from "@src/controllers/services/signup/SignupController";
import CheckValidAccountController from "@src/controllers/services/signup/CheckAlreadyHaveAccountController";
const router = Router();

router.post(
    "/",
    new CheckValidAccountController().excute(),
    new SignupController().excute()
);

export default router;
