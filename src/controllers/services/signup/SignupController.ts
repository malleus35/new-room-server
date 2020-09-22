import { Model } from "sequelize";
import Controller from "@src/controllers/Controller";
import { NextFunction, Request, Response } from "express";
import resTypes from "@src/utils/resTypes";
import { SignUpTypes } from "@src/customTypes/auth/controllers/Signup";
import DBManager from "@src/models/DBManager";
import UserModel from "@src/models/UserModel";
class SignupController extends Controller {
    private newUser: Model | null;
    constructor() {
        super();
        this.newUser = null;
    }
    async doService(req: Request, res: Response, next: NextFunction) {
        const signupBody: SignUpTypes.SignUpBody = req.body;
        const db = new DBManager();
        UserModel.init(db.getConnection());
        await UserModel.sync();
        this.newUser = await UserModel.create(signupBody);
    }
    async doResponse(req: Request, res: Response, next: NextFunction) {
        if (this.newUser == null) resTypes.internalErrorRes(res);
        else resTypes.successRes(res, "Create User");
    }
}

export default SignupController;
