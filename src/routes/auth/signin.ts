import { Request, Response, Router } from "express";
import LogService from "../../../config/winston";

const router = Router();
const logger = LogService.getInstance();

interface SignInBody {
    id: string;
    pwd: string;
}

router.post("/", (req: Request, res: Response) => {
    const resBody: SignInBody = req.body;
    logger.info("Login Success!");
    console.log(resBody);
    res.json({ msg: "Login Success!" });
});

export default router;
