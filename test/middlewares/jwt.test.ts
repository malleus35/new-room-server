import jwt from "jsonwebtoken";

import env from "@src/custom/dotenv";
import LogService from "@src/custom/LogService";
const logger = LogService.getInstance();

env.chooseEnv(env.envTestConfig);
describe("json webtoken test", () => {
    it("basic json webtoken sign test", () => {
        let mJwt: any;
        jest.spyOn(jwt, "sign").mockResolvedValueOnce(mJwt);
        const createToken = jwt.sign(
            { foo: "bar" },
            process.env.JWT_SECRET_KEY,
            {
                algorithm: "RS256",
                expiresIn: "1h"
            }
        );
        console.log(createToken);
        expect(jwt.sign).toBeCalledTimes(1);
    });
});
