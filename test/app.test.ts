import express, { Request, Response } from "express";
import request from "supertest";
import { app } from "../src/app";
import dotenv from "dotenv";
import path from "path";

describe("Test dotenv", () => {
	it("dovenv Test", async () => {
		dotenv.config({
			path: path.join(__dirname, "/envs/.env.test")
		});
		const envApp = express();
		envApp.use(express.json());
		envApp.get("/", (req: Request, res: Response) => {
			res.send("This is dotenv test server!");
		});
		envApp.listen(process.env.PORT);

		const res = await request(envApp)
			.get("/")
			.expect(200, "This is dotenv test server!");
	});
});

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
