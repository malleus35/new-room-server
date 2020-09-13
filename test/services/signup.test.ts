import request from "supertest";
import app from "@src/app";

describe("make server and test login request", () => {
    it("POST /signup", async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        await request(app)
            .post("/api/auth/signup/")
            .send({
                name: "junghun yang",
                pwd: "1234",
                email: "maestroprog@seoultech.ac.kr",
                grade: 4,
                school: "seoultech",
                stdNum: "15109342"
            })
            .expect(200, { msg: "Signup Success!" });
    });
});
