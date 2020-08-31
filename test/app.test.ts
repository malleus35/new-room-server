import express, { Request, Response } from "express";
import request from "supertest";
import dotenv from "dotenv";
import path from "path";
import winston, { createLogger, transports } from "winston";
describe("Test app middlewares", () => {
	it("dovenv Test", async () => {
		dotenv.config({
			path: path.join(__dirname, "../envs/.env.test")
		});
		const envApp = express();
		envApp.use(express.json());
		envApp.get("/", (req: Request, res: Response) => {
			res.send("This is dotenv test server!");
		});
		envApp.listen(3000);
		expect(process.env.PORT).toEqual("8080");

		const res = await request(envApp)
			.get("/")
			.expect(200, "This is dotenv test server!");
	});

	it("winston test", () => {
		const logger = {
			debug: jest.fn(),
			log: jest.fn(),
			info: jest.fn()
		};
		jest.mock("winston", () => ({
			level: jest.fn(() => "info"),
			format: jest.fn(() => winston.format.json()),
			defaultMeta: jest.fn(() => ({ service: "user-service" })),
			createLogger: jest.fn().mockReturnValue(logger),
			transports: {
				Console: jest.fn(
					() =>
						new transports.Console({
							format: winston.format.simple()
						})
				),
				File: jest.fn()
			}
		}));
		let loggerMock: winston.Logger;
		const mockCreateLogger = jest.spyOn(winston, "createLogger");
		loggerMock = mockCreateLogger.mock.instances[0];

		const loggerApp = express();
		loggerApp.use(express.json());
		loggerApp.get("/", (req: Request, res: Response) => {
			const result = { level: "info", message: "Hello Winston!" };
			loggerMock.log(result);
			expect(loggerMock.log).toHaveBeenCalled();
			loggerMock.info({
				message: "Use a helper method if you want",
				additional: "properties",
				are: "passed along"
			});
			expect(loggerMock.info).toHaveBeenCalledTimes(1);
			res.send("This is winston logger test server!");
		});
	});
});
