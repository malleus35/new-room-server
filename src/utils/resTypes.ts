import { Response } from "express";

const resData = (
    res: Response,
    status: number,
    msg: string,
    data?: { [key: string]: any }
) => {
    return res.status(status).json({
        status,
        msg,
        data
    });
};

const resTypes = {
    successRes: (res: Response, msg: string, data?) =>
        resData(res, 200, `${msg} Success!`, data),
    badRequestErrorRes: (res: Response) => resData(res, 400, "Bad Request!"),
    wrongPasswordRes: (res: Response) => resData(res, 401, "Wrong Password!"),
    tokenErrorRes: (res: Response) =>
        resData(res, 401, "Token is Invalid or Expired!"),
    noExistUserRes: (res: Response) => resData(res, 404, "No Exist User!"),
    alreadyHaveItemRes: (res: Response) =>
        resData(res, 409, `Already have Item!`),
    internalErrorRes: (res: Response) =>
        resData(res, 500, "Internal Server Error!"),
    dbErrorRes: (res: Response) => resData(res, 502, "DB Error!")
};

export default resTypes;
