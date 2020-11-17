import { Router } from "express";
import SignupController from "@src/controllers/services/signup/SignupController";
const router = Router();

router.post(
    "/",
    // new CheckValidAccountController().excute(),
    new SignupController().excute()
);

export default router;
