import { Request, Response, Router } from "express";
import LogService from "../../../config/winston";

const router = Router();

const logger = LogService.getInstance();

interface SignUpBody {
    id: string;
    pwd: string;
    grade: number;
    school: string;
    stdNum: number;
}

router.post("/", (req: Request, res: Response) => {
    const resBody: SignUpBody = req.body;
    logger.info("Signup Success!");
    res.json({ msg: "Signup Success!" });
});

export default router;
