import { Request, Response, Router } from "express";
import LogService from "@src/utils/LogService";
import { SignUpTypes } from "@src/customTypes/auth/controllers/Signup";
import JwtController from "@src/controllers/JwtController";
const router = Router();

const logger = LogService.getInstance();
router.post(
    "/",
    new JwtController().getController(),
    (req: Request, res: Response) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {
            name,
            email,
            pwd,
            grade,
            school,
            stdNum
        }: SignUpTypes.SignUpBody = req.body;
        let flag = true;

        if (name && email && pwd && grade && school && stdNum) flag = false;
        if (flag) {
            logger.error("Some field is null!");
            res.status(400).json({ msg: "school field is empty!" });
        }

        logger.info("Signup Success!");
        res.json({ msg: "Signup Success!", token: req.body.token });
    }
);

export default router;
