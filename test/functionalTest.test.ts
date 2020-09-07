import request from "supertest";
import LogService from "../config/winston";
import app from "../src/app";
import { SignInBody, SignUpBody } from "../@types/auth";

const logger = LogService.getInstance();
describe("functional test", () => {
    //정훈이는 앱을 실행시키고 로그인 화면을 본다.
    //정훈이는 이 앱을 처음 사용하기 때문에, 회원가입 화면을 본다.
    //정훈이는 회원가입 화면에서 이름, 이메일, 비밀번호, 비밀번호 확인 ,학교, 학번, 학년을 입력하고 회원가입 신청을 한다.
    it("First access to app and SignUp account", async () => {
        const reqBody: SignUpBody = {
            name: "junghun yang",
            email: "maestroprog@seoultech.ac.kr",
            pwd: "1234",
            grade: 4,
            school: "seoultech",
            stdNum: "15109342"
        };
        await request(app)
            .post("/api/auth/signup")
            .send(reqBody)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, { msg: "Signup Success!" });
        logger.info("Signup success!");
    });

    //정훈이는 회원가입이 승인되고, 로그인 화면에 온다.
    it("Finish signup and try to input login info", async () => {
        await request(app)
            .post("/api/auth/signin")
            .send({
                email: "maestroprog@seoultech.ac.kr",
                pwd: "1234"
            })
            .expect("Content-Type", /json/)
            .expect(200, { msg: "Login Success!" });
    });
    //정훈이는 로그인 화면에서 이메일과 비밀번호를 입력하고, 로그인 버튼을 누른다.
    //정훈이는 로그인을 성공하고 서버로부터 로그인 성공 response를 받는다.

    //민호는 앱을 실행시키고 로그인 화면을 본다.
    //민호는 이 앱을 전에 사용한 기억이 있어서 로그인을 먼저 시도한다.
    //로그인을 시도하고 계정이 없음을 알게되어 회원가입 화면을 본다.

    /*
    회원가입 화면에서 회원가입을 시도하다가 요구 사항중에서 학교를 적지 못했다.
    학교를 적지 못하자 학교란을 입력해달라고 하며 에러가 난다.
    */
    interface dontTypeSchoolRequestBody {
        name: string;
        email: string;
        pwd: string;
        grade: number;
        stdNum: string;
    }
    it("Try to SignUp. but don't type school and check error", async () => {
        const dontTypeSchoolRequestBody: dontTypeSchoolRequestBody = {
            name: "minho park",
            email: "minoflower31@gmail.com",
            pwd: "1234",
            grade: 4,
            stdNum: "14109324"
        };
        await request(app)
            .post("/api/auth/signup")
            .send(dontTypeSchoolRequestBody)
            .expect("Content-Type", /json/)
            .expect(500, { msg: "school field is empty!" });
    });

    /*
    민호는 도중에 가입했던 이메일과 비밀번호가 기억이 나서 로그인을 시도한다.
    그러나 이 입력정보는 잘못 되었던 것이고, 이메일이나 비밀번호가 틀렸음을 전달받는다.
    */
    it("Try to signin, but type wrong information", async () => {
        const wrongPwdReqBody: SignInBody = {
            email: "minoflower31@gmail.com",
            pwd: "1233"
        };
        await request(app)
            .post("/api/auth/signin")
            .send(wrongPwdReqBody)
            .expect("Content-Type", /json/)
            .expect(500, { msg: "Email or password is wrong!" });
    });
});
