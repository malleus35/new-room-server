import redis from "redis";

class RedisManager {
    private client: redis.RedisClient;
    constructor() {
        this.client = redis.createClient({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        });
    }
    getConnection() {
        return this.client;
    }
    endConnection(): void {
        this.client.quit();
    }
}

export default RedisManager;
