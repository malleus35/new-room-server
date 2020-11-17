import LogService from "@src/utils/LogService";
import SignupDao from "@src/dao/SignupDao";
import serviceFactory from "@src/vo/auth/services/ServiceFactory";
import User from "@src/models/UserModel";
const logger = LogService.getInstance();
class SignupService {
    static findOne = serviceFactory.get<User>(SignupDao.getInstance().findOne);
    static create = serviceFactory.postOrUpdate<User>(
        SignupDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<User>(
        SignupDao.getInstance().update
    );
    static delete = serviceFactory.delete<User>(SignupDao.getInstance().delete);
    // static async isAlreadyHaveAccount(req: Request): Promise<string> {
    //     const signupBody: SignUpTypes.SignUpBody = req.body;
    //     if (
    //         !signupBody.email ||
    //         !signupBody.pwd ||
    //         !signupBody.name ||
    //         // !signupBody.grade ||
    //         // !signupBody.school ||
    //         !signupBody.stdNum
    //     )
    //         return "BadRequest";
    //     const find = await SignupDao.getInstance().find(signupBody.email);
    //     switch (find) {
    //         case undefined:
    //             return "InternalServerError";
    //         default:
    //             if (find !== null) return "AlreadyExistItem";
    //             else return "SuccessSignUp";
    //     }
    // }
    // static async signup(
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ): Promise<string> {
    //     const signupBody: SignUpTypes.SignUpBody = req.body;
    //     if (
    //         !signupBody.email ||
    //         !signupBody.pwd ||
    //         !signupBody.name ||
    //         // !signupBody.grade ||
    //         // !signupBody.school ||
    //         !signupBody.stdNum
    //     )
    //         return "BadRequest";
    //     console.log(signupBody);
    //     console.log(req.body);
    //     const newUser = await SignupDao.getInstance().save(signupBody);
    //     switch (newUser) {
    //         case undefined:
    //             return "InteralServerError";
    //         default:
    //             return "Success";
    //     }
    // }
}

export default SignupService;
