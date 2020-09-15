import jwt, {
    JsonWebTokenError,
    TokenExpiredError,
    VerifyErrors
} from "jsonwebtoken";
import LogService from "@src/utils/LogService";

const logger = LogService.getInstance();
class JwtService {
    static async createToken(payload): Promise<string> {
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

    static async verifyToken(token): Promise<string | object | null> {
        let validToken: string | object | null = "";
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
