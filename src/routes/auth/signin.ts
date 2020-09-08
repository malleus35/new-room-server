import { Request, Response, Router } from "express";
import LogService from "../../custom_modules/winston";
import { SignInBody } from "../../../@types/auth";
const router = Router();
const logger = LogService.getInstance();

router.post("/", (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const resBody: SignInBody = req.body;
    logger.info("Login Success!");
    if (resBody.pwd === "1233") {
        logger.error("Email or password fail");
        res.status(500).json({ msg: "Email or password is wrong!" });
    }
    console.log(resBody);
    res.json({ msg: "Login Success!" });
});

export default router;
