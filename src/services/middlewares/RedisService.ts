import RedisManager from "@src/models/RedisManager";
import LogService from "@src/utils/LogService";

const logger = LogService.getInstance();

class RedisService {
    private tokenDB: RedisManager | null;
    private static instance: RedisService;
    private static setSingleton(): void {
        if (this.instance == null) this.instance = new RedisService();
    }
    private constructor() {
        this.tokenDB = null;
    }
    static getInstance() {
        if (this.instance == null) this.setSingleton();
        return this.instance;
    }
    private connect() {
        return new RedisManager();
    }
    async saveToken(key: string, value: string): Promise<string | number> {
        this.tokenDB = this.connect();
        const result = await this.tokenDB.save(key, value);
        this.tokenDB.endConnection();
        return result;
    }

    async findToken(key: string): Promise<string> {
        this.tokenDB = this.connect();
        const result = this.tokenDB.find(key);
        this.tokenDB.endConnection();
        return result;
    }

    async isTokenExpired(key: string): Promise<number> {
        this.tokenDB = this.connect();
        const result = this.tokenDB.checkTTL(key);
        this.tokenDB.endConnection();
        return result;
    }

    async deleteToken(key: string): Promise<number> {
        this.tokenDB = this.connect();
        const result = this.tokenDB.delete(key);
        this.tokenDB.endConnection();
        return result;
    }
}

export default RedisService;
