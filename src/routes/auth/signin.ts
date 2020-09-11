import { Request, Response, Router } from "express";
import LogService from "@src/custom/LogService";
import { SignInTypes } from "@src/customTypes/auth/Signin";
const router = Router();
const logger = LogService.getInstance();

router.post("/", (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const resBody: SignInTypes.SignInBody = req.body;
    logger.info("Login Success!");
    if (resBody.pwd === "1233") {
        logger.error("Email or password fail");
        res.status(500).json({ msg: "Email or password is wrong!" });
    }
    console.log(resBody);
    res.json({ msg: "Login Success!" });
});

export default router;
