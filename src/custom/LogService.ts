/* eslint-disable @typescript-eslint/restrict-template-expressions */
import fs from "fs";
import winston, { format, createLogger, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

class LogService {
    private logger: winston.Logger;

    private logDir: fs.PathLike;

    private static instance: LogService;

    private constructor() {
        this.logDir = `log`; //webpack으로 build시 ${__dirname}/log 여야 함.
        this.mkLogDir();
        this.logger = this.mkLogger();
    }

    private static setSingleton(): void {
        if (LogService.instance == null) LogService.instance = new LogService();
    }

    private mkLogDir(): void {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir);
        }
    }

    private mkLogger(): winston.Logger {
        const loggerFormat = format.combine(
            format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss"
            }),
            format.printf(
                (info: winston.Logform.TransformableInfo) =>
                    `${info.timestamp} ${info.level} ${info.message}`
            )
        );
        const infoRotateFile = new DailyRotateFile({
            level: "info",
            dirname: `${this.logDir}/`,
            filename: "application-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d"
        });
        const errorRotateFile = new DailyRotateFile({
            level: "error",
            dirname: `${this.logDir}/`,
            filename: "application-%DATE%-error.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d"
        });
        const consoleTransport = new transports.Console({
            level: "info",
            format: format.combine(
                format.printf(
                    (info) => `${info.timestamp} ${info.level} ${info.message}`
                )
            )
        });
        const loggerTrasnports = [
            infoRotateFile,
            errorRotateFile,
            consoleTransport
        ];
        const loggerConfig: winston.LoggerOptions = {
            level: "debug",
            format: loggerFormat,
            defaultMeta: { serivce: "user-service" },
            transports: loggerTrasnports
        };
        return createLogger(loggerConfig);
    }

    static getInstance(): LogService {
        if (LogService.instance == null) LogService.setSingleton();
        return this.instance;
    }

    static getLogger(): winston.Logger {
        return this.getInstance().logger;
    }

    log(level: string, message: unknown): void {
        LogService.instance.logger.log(level, `${message}`);
    }

    info(msg: unknown): void {
        LogService.instance.logger.info({
            message: `${msg}`,
            additional: "properties",
            are: "passed along"
        });
    }

    error(msg: unknown): void {
        LogService.instance.logger.error({
            message: `${msg}`,
            additional: "properties",
            are: "passed along"
        });
    }
}

export default LogService;
