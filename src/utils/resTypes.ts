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
    cannotFindItemRes: (res: Response, item: string) =>
        resData(res, 404, `Cannot Find ${item}!`),
    alreadyExistItemRes: (res: Response, item: string) =>
        resData(res, 409, `Already exist ${item}!`),
    internalErrorRes: (res: Response) =>
        resData(res, 500, "Internal Server Error!"),
    unexpectedErrorRes: (res: Response) =>
        resData(res, 500, "Unexpected Error!"),
    noItemDeletedRes: (res: Response, item: string) =>
        resData(res, 404, `No ${item} delete!`),
    dbErrorRes: (res: Response) => resData(res, 502, "DB Error!")
};

export default resTypes;
