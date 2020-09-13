import jwt from "jsonwebtoken";
import LogService from "@src/utils/LogService";

const logger = LogService.getInstance();
class JwtService {
    static createToken(payload): string {
        const options = {
            expiresIn: "1h"
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
        return token;
    }

    static verifyToken(token): object | string | null {
        let validToken: object | string;
        try {
            validToken = jwt.verify(token, "MINO_JUNGHUN_JONGHEE");
        } catch (err) {
            logger.error(err);
            return null;
        }
        return validToken;
    }
}
export default JwtService;
