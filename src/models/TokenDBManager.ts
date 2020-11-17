import redis from "redis";
import DBManager from "@src/models/DBManager";

class TokenDBManager extends DBManager {
    private static instance: TokenDBManager;
    private constructor() {
        super();
        this.connection = redis.createClient({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        });
    }
    protected static setSingleton(): void {
        if (this.instance == null) this.instance = new this();
    }
    static getInstance(): TokenDBManager {
        if (this.instance == null) this.setSingleton();
        return this.instance;
    }
    getConnection() {
        return this.connection;
    }
    endConnection(): void {
        this.connection.quit();
    }
}

export default TokenDBManager;
