/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import InitDao from "@src/dao/InitializerDao";

class InitService {
    static async Init(): Promise<void> {
        const find = await InitDao.getInstance();
    }
}

export default InitService;
