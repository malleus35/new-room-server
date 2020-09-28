// import RedisManager from "@src/models/RedisManager";
// import LogService from "@src/utils/LogService";

// const logger = LogService.getInstance();

// class RedisService {
//     static async saveToken(
//         key: string,
//         value: string
//     ): Promise<string | number> {
//         const tokenDB = new RedisManager();
//         const result = await tokenDB.save(key, value);
//         tokenDB.endConnection();
//         return result;
//     }

//     static async findToken(key: string): Promise<string> {
//         const tokenDB = new RedisManager();
//         const result = tokenDB.find(key);
//         tokenDB.endConnection();
//         return result;
//     }

//     static async isTokenExpired(key: string): Promise<number> {
//         const tokenDB = new RedisManager();
//         const result = tokenDB.checkTTL(key);
//         tokenDB.endConnection();
//         return result;
//     }

//     static async deleteToken(key: string): Promise<number> {
//         const tokenDB = new RedisManager();
//         const result = tokenDB.delete(key);
//         tokenDB.endConnection();
//         return result;
//     }
// }

// export default RedisService;
import RedisManager from "@src/models/RedisManager";
import LogService from "@src/utils/LogService";

const logger = LogService.getInstance();

class RedisService {
    private tokenDB: RedisManager;
    private static instance: RedisService;
    private static setSingleton(): void {
        if (this.instance == null) this.instance = new RedisService();
    }
    private constructor() {
        this.tokenDB = new RedisManager();
    }
    static getInstance() {
        if (this.instance == null) this.setSingleton();
        return this.instance;
    }
    async connect() {
        this.tokenDB.endConnection();
        this.tokenDB = new RedisManager();
    }
    endConnect() {
        this.tokenDB.endConnection();
    }
    async saveToken(key: string, value: string): Promise<string | number> {
        const result = await this.tokenDB.save(key, value);
        return result;
    }

    async findToken(key: string): Promise<string> {
        const result = await this.tokenDB.find(key);
        return result;
    }

    async isTokenExpired(key: string): Promise<number> {
        const result = await this.tokenDB.checkTTL(key);
        return result;
    }

    async deleteToken(key: string): Promise<number> {
        const result = await this.tokenDB.delete(key);
        return result;
    }
}

export default RedisService;
