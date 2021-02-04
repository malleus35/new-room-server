import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import resTypes from "@src/utils/resTypes";
import UserService from "@src/services/UserService";
class SignupController extends Controller {
    private result: string;
    constructor() {
        super();
        this.result = "";
    }
    async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await UserService.create(req);
    }
    async doResolve(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        switch (this.result) {
            case "BadRequest":
                resTypes.badRequestErrorRes(res);
                break;
            case "InternalServerError":
                resTypes.internalErrorRes(res);
                break;
            case "UnexpectedError":
                resTypes.unexpectedErrorRes(res);
                break;
            case "AlreadyExistItem":
                resTypes.alreadyExistItemRes(res, "user");
                break;
            default:
                resTypes.successRes(res, "Signup");
        }
    }
}

export default SignupController;
