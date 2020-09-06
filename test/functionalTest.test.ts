import express, {Request, Response} from "express"
import request from "supertest"
import {LogService} from "../config/winston"
import {app} from "../src/app";

describe('functional test', () => {
	//정훈이는 앱을	킨다.
	//정훈이는 로그인 화면을 본다.
//정훈이는 신규 사용자이기 때문에 회원가입을 먼저 시도한다.
//정훈이는 회원가입을 하기 위해서 이름, 이메일, 비밀번호, 학교, 학번, 학과를 입력한다.
//
//정훈이는 가입 완료 버튼을 누른다.
//그 후 로그인 화면으로 전환한다.
//로그인 화면에서 이메일과 비밀번호를 입력하고 로그인을 한다.
//로그인을 할 때, JWT를 받고, 로그인 성공 메시지를 받는다.
});
