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
    internalErrorRes: (res) => resData(res, 500, "Internal Server Error!"),
    dbErrorRes: (res) => resData(res, 502, "DB Error!"),
    badRequestErrorRes: (res) => resData(res, 400, "Bad Request!"),
    tokenErrorRes: (res) => resData(res, 401, "Token is Invalid or Expired!")
};

export default resTypes;
