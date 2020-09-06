import request from "supertest";
import LogService from "../config/winston";
import app from "../src/app";

describe("functional test", () => {
    //정훈이는 앱을 실행시키고 로그인 화면을 본다.
    //정훈이는 이 앱을 처음 사용하기 때문에, 회원가입 화면을 본다.
    //정훈이는 회원가입 화면에서 이름, 이메일, 비밀번호, 비밀번호 확인 ,학교, 학번, 학년을 입력하고 회원가입 신청을 한다.
    test("POST /signup", () => {
        //asdfasf
    });
    //정훈이는 회원가입이 승인되고, 로그인 화면에 온다.
    //정훈이는 로그인 화면에서 이메일과 비밀번호를 입력하고, 로그인 버튼을 누른다.
    //정훈이는 로그인을 성공하고 서버로부터 로그인 성공 response를 받는다.
});
