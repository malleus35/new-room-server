import redis from "redis";
import LogSerivce from "@src/utils/LogService";
import { ResolveOptions } from "dns";

const logger = LogSerivce.getInstance();
class RedisManager {
    private client:redis.RedisClient
    constructor() {
        this.client = redis.createClient({
            {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
        )
    }
}

export default RedisManager;