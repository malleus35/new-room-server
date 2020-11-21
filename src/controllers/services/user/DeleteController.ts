import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";
import UserService from "@src/services/UserService";
import resTypes from "@src/utils/resTypes";

class DeleteController extends Controller {
    private result: string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await UserService.delete(req);
    }
    protected async doResolve(
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
            case "NoItemDeleted":
                resTypes.noItemDeletedRes(res, "user");
                break;
            default:
                resTypes.successRes(res, "Delete User");
        }
    }
}

export default DeleteController;
