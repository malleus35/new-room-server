import Controller from "@src/controllers/Controller";

import resTypes from "@src/utils/resTypes";

import UserService from "@src/services/UserService";

class CheckValidAccountController extends Controller {
    private isAlreadyHaveAccount: string;
    constructor() {
        super();
        this.isAlreadyHaveAccount = "";
    }

    async doService(req, res, next) {
        // this.isAlreadyHaveAccount = await SignupService.isAlreadyHaveAccount(
        //     req
        // );
    }
    async doResolve(req, res, next) {
        switch (this.isAlreadyHaveAccount) {
            case "BadRequest":
                resTypes.badRequestErrorRes(res);
                break;
            case "InternalServerError":
                resTypes.internalErrorRes(res);
                break;
            case "AlreadyExistUser":
                resTypes.alreadyExistItemRes(res, "user");
                break;
            default:
                next();
        }
    }
}

export default CheckValidAccountController;
