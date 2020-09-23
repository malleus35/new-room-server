import { Request, Response, Router } from "express";
import LogService from "@src/utils/LogService";
import { SignInTypes } from "@src/customTypes/auth/controllers/Signin";
import resTypes from "@src/utils/resTypes";
const router = Router();
const logger = LogService.getInstance();

router.post("/", (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const resBody: SignInTypes.SignInBody = req.body;
    logger.info("Login Success!");
    if (resBody.pwd === "1233") {
        logger.error("Email or password fail");
        resTypes.badRequestErrorRes(res);
    }
    resTypes.successRes(res, "Login");
});

export default router;
