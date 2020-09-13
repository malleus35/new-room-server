import request from "supertest";
import app from "@src/app";

describe("make server and test login request", () => {
    it("POST /signup", (done) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        request(app)
            .post("/api/auth/signup/")
            .set("Accept", "application/json")
            .send({
                name: "junghun yang",
                pwd: "1234",
                email: "maestroprog@seoultech.ac.kr",
                grade: 4,
                school: "seoultech",
                stdNum: "15109342"
            })
            .end((err, res) => {
                expect(res.body.msg).toEqual("Signup Success!");
                done();
            });
    });
});
