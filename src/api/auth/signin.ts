import { Router } from "express";
import SignInController from "@src/controllers/services/signin/SigninController";
import TokenSignInController from "@src/controllers/services/signin/TokenSigninController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
import JwtVerifyRefreshController from "@src/controllers/middlewares/jwt/JwtVerifyRefreshController";
const router = Router();

router.post("/", new SignInController().getController());
router.post(
    "/verify",
    new JwtVerifyAccessController().getController(),
    new TokenSignInController().getController()
);
router.get("/refresh", new JwtVerifyRefreshController().getController());
export default router;
