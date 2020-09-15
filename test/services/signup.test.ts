import request from "supertest";
import app from "@src/app";
import LogService from "@src/utils/LogService";
describe("make server and test login request", () => {
    const logger = LogService.getInstance();
    it("200 OK and sign accessToken and refreshToken POST /signup ", (done) => {
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
                console.log(res.body);
                expect(res.body.msg).toEqual("Signup Success!");
                expect(res.body.accessToken).not.toBeUndefined();
                expect(res.body.refreshToken).not.toBeUndefined();
                logger.info("200 OK BASE");
                logger.info(res.body.accessToken);
                logger.info(res.body.refreshToken);
                done();
            });
    });

    it("200 OK with verify accessToken jwtToken POST /signup", (done) => {
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
                accessToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m8"
            })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                    done();
                }
                expect(res.body.msg).toEqual("Signup Success!");
                expect(res.body.accessToken).toBeUndefined();
                expect(res.body.refreshToken).toBeUndefined();
                logger.info("200 OK with accessToken");
                done();
            });
    });

    it("401 Unauthorized with invalid accessToken jwtToken POST /signup", (done) => {
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
                accessToken:
                    "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m8"
            })
            .expect(401)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                    done();
                }
                expect(res.body.msg).toEqual("Access Token is Invalid");
                expect(res.body.accessToken).toBeUndefined();
                expect(res.body.refreshToken).toBeUndefined();
                done();
            });
    });

    it("401 Unauthorized with Expired accessToken jwtToken POST /signup", (done) => {
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
                accessToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2ODY5LCJleHAiOjE2MDAwNzY4Nzl9.FIl96VRlXWfNam7EJVMjOffdXogF-7LzFGabeWfhxw4"
            })
            .expect(401)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                    done();
                }
                expect(res.body.msg).toEqual("Access Token is expired");
                expect(res.body.accessToken).toBeUndefined();
                expect(res.body.refreshToken).toBeUndefined();
                done();
            });
    });

    it("200 OK with verify refreshToken jwtToken POST /signup", (done) => {
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
                accessToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m8",
                refreshToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m8"
            })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                    done();
                }
                expect(res.body.msg).toEqual("Signup Success!");
                expect(res.body.accessToken).not.toBeUndefined();
                expect(res.body.refreshToken).toBeUndefined();
                logger.info("200 OK with refreshToken");
                done();
            });
    });

    it("401 Unauthorized with invalid refreshToken jwtToken POST /signup", (done) => {
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
                accessToken:
                    "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m8",
                refreshToken:
                    "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2Nzk3LCJleHAiOjE2MTMwMzY3OTd9.PjhxKdQNomsMLlH4mxmhTz-8D0DdyFIYj66T_U4U9m8"
            })
            .expect(401)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                    done();
                }
                expect(res.body.msg).toEqual("Refresh Token is Invalid");
                expect(res.body.accessToken).toEqual("");
                expect(res.body.refreshToken).toEqual("");
                done();
            });
    });

    it("401 Unauthorized with Expired RefreshToken jwtToken POST /signup", (done) => {
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
                accessToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2ODY5LCJleHAiOjE2MDAwNzY4Nzl9.FIl96VRlXWfNam7EJVMjOffdXogF-7LzFGabeWfhxw4",
                refreshToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianVuZ2h1biBZYW5nIiwiaWF0IjoxNjAwMDc2ODY5LCJleHAiOjE2MDAwNzY4Nzl9.FIl96VRlXWfNam7EJVMjOffdXogF-7LzFGabeWfhxw4"
            })
            .expect(401)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                    done();
                }
                expect(res.body.msg).toEqual("Refresh Token is expired");
                expect(res.body.accessToken).toEqual("");
                expect(res.body.refreshToken).toEqual("");
                done();
            });
    });
});
