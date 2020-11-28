import { Kafka } from "kafkajs";
import DBManager from "@src/models/DBManager";

class KafkaManager extends DBManager {
    private static instance: KafkaManager;
    protected connection: Kafka;

    private constructor() {
        super();
        this.connection = new Kafka({
            clientId: "my-app",
            brokers: [
                `${process.env.KAFKA_HOST_NAME_1}:${process.env.KAFKA_HOST_PORT_1}`,
                `${process.env.KAFKA_HOST_NAME_2}:${process.env.KAFKA_HOST_PORT_2}`,
                `${process.env.KAFKA_HOST_NAME_3}:${process.env.KAFKA_HOST_PORT_3}`
            ]
            // brokers: ["localhost:9095", "localhost:9096", "localhost:9097"]
        });
    }
    protected static setSingleton(): void {
        if (this.instance == null) this.instance = new this();
    }
    static getInstance(): KafkaManager {
        if (this.instance == null) this.setSingleton();
        return this.instance;
    }
    getConnection(): Kafka {
        return this.connection;
    }
    endConnection(): void {}
}

export default KafkaManager;
