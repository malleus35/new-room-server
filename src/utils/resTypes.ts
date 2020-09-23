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
    internalErrorRes: (res: Response) =>
        resData(res, 500, "Internal Server Error!"),
    dbErrorRes: (res: Response) => resData(res, 502, "DB Error!"),
    alreadyHaveItemRes: (res: Response) =>
        resData(res, 502, `Already have Item!`),
    badRequestErrorRes: (res: Response) => resData(res, 400, "Bad Request!"),
    tokenErrorRes: (res: Response) =>
        resData(res, 401, "Token is Invalid or Expired!")
};

export default resTypes;
