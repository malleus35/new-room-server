import express, { Request, Response } from "express";
import request from "supertest";
import { app } from "../src/app";

describe("make server and test login request", () => {
	it("GET /", async () => {
		const res = await request(app)
			.get("/")
			.expect(200);
	});

	it("POST /signin", async () => {
		const res = await request(app)
			.get("/signin")
			.send({ id: "maestroprog", pwd: "1234" })
			.expect(200, { msg: "Login Success!" });
	});
});
