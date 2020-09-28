import Controller from "@src/controllers/Controller";

import resTypes from "@src/utils/resTypes";

import SignupService from "@src/services/SignupService";

class CheckValidAccountController extends Controller {
    private isAlreadyHaveAccount: string;
    constructor() {
        super();
        this.isAlreadyHaveAccount = "";
    }

    async doService(req, res, next) {
        this.isAlreadyHaveAccount = await SignupService.isAlreadyHaveAccount(
            req
        );
    }
    async doResolve(req, res, next) {
        if (this.isAlreadyHaveAccount === "InternalServerError")
            resTypes.internalErrorRes(res);
        else if (this.isAlreadyHaveAccount === "AlreadyExistUser")
            resTypes.alreadyHaveItemRes(res);
        else next();
    }
}

export default CheckValidAccountController;
