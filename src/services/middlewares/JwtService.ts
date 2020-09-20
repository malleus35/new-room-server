import jwt, { TokenExpiredError } from "jsonwebtoken";

class JwtService {
    static async createAccessToken(email): Promise<string> {
        const payload = {
            email,
            exp: "2020-11-18T20:25:43.511Z"
        };
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
    static async createRefreshToken(): Promise<string> {
        const payload = {
            exp: "2020-11-18T20:25:43.511Z"
        };
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

    static async decodeToken(
        token
    ): Promise<{ [key: string]: any } | string | null> {
        return await jwt.decode(token, { complete: true });
    }
}
export default JwtService;
