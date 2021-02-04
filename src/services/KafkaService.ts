/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import KafkaDao from "@src/dao/KafkaDao";

class KafkaService {
    static async Init(): Promise<void> {
        const find = await KafkaDao.getInstance();
    }
}

export default KafkaService;
