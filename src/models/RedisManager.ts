import redis from "redis";
import { promisify } from "util";
import LogSerivce from "@src/utils/LogService";

const logger = LogSerivce.getInstance();
class RedisManager {
    private client: redis.RedisClient;
    private getAsync: Function;
    private setAsync: Function;
    private ttlAsync: Function;
    private delAsync: Function;
    private INIT_NUM: number;
    constructor() {
        this.client = redis.createClient({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        });
        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setAsync = promisify(this.client.set).bind(this.client);
        this.ttlAsync = promisify(this.client.ttl).bind(this.client);
        this.delAsync = promisify(this.client.del).bind(this.client);
        this.INIT_NUM = -987654321;
    }
    async save(key: string, value: string): Promise<string | number> {
        let result = this.INIT_NUM;
        await this.setAsync(key, value, "EX", 60 * 60 * 24 * 14, "NX")
            .then((reply) => {
                result = reply;
                logger.info(reply.toString());
            })
            .catch((err) => {
                logger.error(err);
            });
        return result;
    }
    async find(key: string): Promise<string> {
        let result: string = "";
        await this.getAsync(key)
            .then((reply) => {
                logger.info(reply.toString());
                result = reply.toString();
            })
            .catch((err) => {
                logger.error(err);
                result = err.toString();
            });
        return result;
    }
    async checkTTL(key: string): Promise<number> {
        let result: number = this.INIT_NUM;
        await this.ttlAsync(key)
            .then((reply) => {
                logger.info(reply);
                result = result;
            })
            .catch((err) => {
                logger.error(err);
            });
        return result;
    }
    async delete(key: string): Promise<number> {
        let result: number = this.INIT_NUM;
        await this.delAsync(key)
            .then((reply) => {
                result = reply;
            })
            .catch((err) => {
                console.log(err);
            });
        return result;
    }
    endConnection(): void {
        this.client.quit();
        this.client.end(true);
    }
}

export default RedisManager;
