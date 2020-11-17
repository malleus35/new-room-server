import { Kafka } from "kafkajs";
import DBManager from "@src/models/DBManager";

class KafkaManager extends DBManager {
    private static instance: KafkaManager;
    protected connection: Kafka | undefined;

    private constructor() {
        super();
        this.connection = new Kafka({
            clientId: "my-app",
            brokers: ["127.0.0.1:9095", "127.0.0.1:9096", "127.0.0.1:9097"]
        });
    }
    protected static setSingleton(): void {
        if (this.instance == null) this.instance = new this();
    }
    static getInstance(): KafkaManager {
        if (this.instance == null) this.setSingleton();
        return this.instance;
    }
    getConnection(): Kafka | undefined {
        return this.connection;
    }
    endConnection(): void {}
}

export default KafkaManager;
