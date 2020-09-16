import jwt, { TokenExpiredError } from "jsonwebtoken";
import LogService from "@src/utils/LogService";

const logger = LogService.getInstance();
class JwtService {
    static async createAccessToken(payload): Promise<string> {
        const options = {
            expiresIn: "10s"
        };
        const token = await jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            options
        );
        return token;
    }
    static async createRefreshToken(payload): Promise<string> {
        const options = {
            expiresIn: "2 week"
        };
        const token = await jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            options
        );
        return token;
    }

    static async verifyToken(token): Promise<string | object | null> {
        let validToken: string | object | undefined = "";
        if (token === "" || token === undefined) return "NoExistedToken";
        try {
            validToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                validToken = "ExpiredToken";
            } else {
                validToken = "InvalidToken";
            }
        }
        return validToken;
    }
}
export default JwtService;
