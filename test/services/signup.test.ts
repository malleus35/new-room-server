import request from "supertest";
import app from "@src/app";
import LogService from "@src/utils/LogService";
describe("make server and test signup request", () => {
    const logger = LogService.getInstance();
    it("200 OK and sign accessToken and refreshToken POST /signup ", (done) => {
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
            .expect(200)
            .end((err, res) => {
                expect(res.body.msg).toEqual("Signup Success!");
                logger.info("200 OK BASE");
                done();
            });
    });

    it("401 NO POST DATA with POST /signup", (done) => {
        request(app)
            .post("/api/auth/signup/")
            .set("Accept", "application/json")
            .send({
                name: "junghun yang",
                pwd: "1234",
                email: "maestroprog@seoultech.ac.kr",
                grade: 4,
                stdNum: "15109342"
            })
            .expect(401)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                    done();
                }
                expect(res.body.msg).toEqual("Bad Request!");
                done();
            });
    });

    it.skip("401 Already Existed User POST /signup", (done) => {
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
            .expect(401)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                    done();
                }
                expect(res.body.msg).toEqual("Already Existed User!");
                done();
            });
    });
});
