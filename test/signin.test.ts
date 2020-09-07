import request from "supertest";
import app from "../src/app";
describe("make server and test login request", () => {
    it("POST /signin", async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        await request(app)
            .post("/api/auth/signin")
            .send({ id: "maestroprog", pwd: "1234" })
            .expect(200, { msg: "Login Success!" });
    });
});
