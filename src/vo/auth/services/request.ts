import { Request } from "express";

interface StrictDecoded {
    email: string;
}
interface StrictRequest extends Request {
    decoded: StrictDecoded;
}

export default StrictRequest;
