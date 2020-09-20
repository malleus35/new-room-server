import express from "express";
import { SignUpTypes } from "@src/customTypes/auth/controllers/Signup";
class SignupService {
    static signup({
        name,
        pwd,
        email,
        grade,
        school,
        stdNum
    }: SignUpTypes.SignUpBody) {}
}

export default SignupService;
