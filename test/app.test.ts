import LogService from "../src/middleware/winston";
import env from "../src/middleware/dotenv";
describe("Test app middlewares", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it("custom dotenv test", () => {
        env.chooseEnv();
        expect(process.env.PORT).not.toEqual("5000");
        expect(process.env.PORT).not.toEqual("8080");
        expect(process.env.PORT).toEqual("8000");
    });
    it("winston test", () => {
        jest.mock("winston", () => {
            const mockLogger = {
                debug: jest.fn(),
                log: jest.fn(),
                info: jest.fn()
            };
            return {
                level: jest.fn(),
                format: {
                    combine: jest.fn(),
                    timestamp: jest.fn(),
                    printf: jest.fn()
                },
                defaultMeta: jest.fn(),
                createLogger: jest.fn().mockReturnValue(mockLogger),
                transports: {
                    infoDailyRotate: jest.fn(),
                    errorDailyRotate: jest.fn()
                }
            };
        });

        const mockCreateService = jest.spyOn(LogService, "getInstance");
        const realLogService: LogService = LogService.getInstance();

        const mockCreateLog = jest.spyOn(realLogService, "log");
        const mockCreateInfo = jest.spyOn(realLogService, "info");

        expect(mockCreateService).toHaveBeenCalled();
        expect(realLogService).toBeDefined();

        realLogService.log({ level: "error", message: "Hello Winston!" });
        expect(mockCreateLog).toHaveBeenCalled();

        realLogService.info("Use a helper method if you want");
        expect(mockCreateInfo).toHaveBeenCalledTimes(1);
    });
});
