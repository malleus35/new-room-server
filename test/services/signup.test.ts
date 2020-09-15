import request from "supertest";
import app from "@src/app";
import LogService from "@src/utils/LogService";
describe("make server and test login request", () => {
    const logger = LogService.getInstance();
    it("200 OK POST /signup ", (done) => {
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
            .expect(200)
            .end((err, res) => {
                expect(res.body.msg).toEqual("Signup Success!");
                logger.info("200 OK BASE");
                logger.info(res.body.token);
                done();
            });
    });

    it("200 OK with token jwtToken POST /signup", (done) => {
        request(app)
            .post("/api/auth/signup/")
            .set("Accept", "application/json")
            .send({
                name: "junghun yang",
                pwd: "1234",
                email: "maestroprog@seoultech.ac.kr",
                grade: 4,
                school: "seoultech",
                stdNum: "15109342",
                //token expired In 150D
                token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m8"
            })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                    done();
                }
                expect(res.body.msg).toEqual("Signup Success!");
                logger.info("200 OK with Token");
                logger.info(res.body.token);
                done();
            });
    });

    it("401 Unauthorized with invalid token jwtToken POST /signup", (done) => {
        request(app)
            .post("/api/auth/signup/")
            .set("Accept", "application/json")
            .send({
                name: "junghun yang",
                pwd: "1234",
                email: "maestroprog@seoultech.ac.kr",
                grade: 4,
                school: "seoultech",
                stdNum: "15109342",
                //token expiredIn 150D
                token:
                    "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m8"
            })
            .expect(401)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                    done();
                }
                expect(res.body.msg).toEqual("This Token is not valid");
                logger.info(res.body.token);
                done();
            });
    });

    it("401 Unauthorized with Expired token jwtToken POST /signup", (done) => {
        request(app)
            .post("/api/auth/signup/")
            .set("Accept", "application/json")
            .send({
                name: "junghun yang",
                pwd: "1234",
                email: "maestroprog@seoultech.ac.kr",
                grade: 4,
                school: "seoultech",
                stdNum: "15109342",
                //token expired In 10s
                token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2ODY5LCJleHAiOjE2MDAwNzY4Nzl9.FIl96VRlXWfNam7EJVMjOffdXogF-7LzFGabeWfhxw4"
            })
            .expect(401)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                    done();
                }
                expect(res.body.msg).toEqual("This Token is expired");
                logger.info(res.body.token);
                done();
            });
    });
});
