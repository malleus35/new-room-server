import User from "@src/models/UserModel";

import SigninDao from "@src/dao/SigninDao";
import serviceFactory from "@src/vo/auth/services/ServiceFactory";
class SigninService {
    static findOne = serviceFactory.signin<User>(
        SigninDao.getInstance().findOne
    );
    // static async signin(
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ): Promise<string> {
    //     const signinBody: SignInTypes.SignInBody = req.body;
    //     if (!signinBody.email || !signinBody.pwd) return "BadRequest";

    //     const user:
    //         | User
    //         | null
    //         | undefined = await SigninDao.getInstance().find(signinBody.email);
    //     switch (user) {
    //         case undefined:
    //             return "InternalServerError";
    //         case null:
    //             return "NoExistUser";
    //         default:
    //             if ((await argon2.verify(user.pwd, signinBody.pwd)) === false)
    //                 return "WrongPassword";
    //             else return "Success";
    //     }
    // }
}

export default SigninService;
