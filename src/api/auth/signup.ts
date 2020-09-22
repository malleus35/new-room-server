import { Request, Response, Router } from "express";
import LogService from "@src/utils/LogService";
import { SignUpTypes } from "@src/customTypes/auth/controllers/Signup";
import resTypes from "@src/utils/resTypes";
const router = Router();

const logger = LogService.getInstance();

router.post("/", (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {
        name,
        email,
        pwd,
        grade,
        school,
        stdNum
    }: SignUpTypes.SignUpPostBody = req.body;
    let flag = true;

    if (name && email && pwd && grade && school && stdNum) flag = false;
    if (flag) {
        logger.error("Some field is null!");
        resTypes.badRequestErrorRes(res);
    }

    resTypes.successRes(res, "Signup");
});

export default router;
