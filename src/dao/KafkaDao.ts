import KafkaManager from "@src/models/KafkaManager";
import Dao from "@src/dao/Dao";
import { Consumer, EachMessagePayload, Producer } from "kafkajs";
import KafkaData from "@src/vo/auth/services/kafkaData";

interface producers {
    [attr: string]: Producer;
}

interface consumers {
    [attr: string]: Consumer;
}
interface messageFuncs {
    [attr: string]: (payload: EachMessagePayload) => Promise<void>;
}
interface producersName {
    [attr: string]: string;
}
interface consumersName {
    [attr: string]: string;
}

class KafkaDao extends Dao {
    protected db: KafkaManager;
    private producers: producers;
    private consumers: consumers;
    private messageFuncs: messageFuncs;
    private producersName: producersName;
    private consumersName: consumersName;

    private constructor() {
        super();
        this.db = KafkaManager.getInstance();
        this.producers = {};
        this.consumers = {};
        this.producersName = {
            userMemberCreate: "userMemberCreate",
            userMemberDelete: "userMemberDelete"
        };
        this.consumersName = {
            memberUserCreate: "memberUserCreate",
            memberUserDelete: "memberUserDelete"
        };
        this.messageFuncs = {
            memberUserCreate: async ({ topic, partition, message }: any) => {
                const received = JSON.parse(message.value);
                console.log(received);
            },
            memberUserDelete: async ({ topic, partition, message }: any) => {
                const received = JSON.parse(message.value);
                console.log(received);
            }
        };
        const firstInit = async () => await this.init();
        firstInit();
    }

    protected async connect() {
        this.db = KafkaManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }

    private async producerInit(name: string): Promise<void> {
        const producer = this.db.getConnection().producer();
        await producer.connect();
        this.producers[name] = producer;
    }

    private async consumerInit(name: string, topic: string): Promise<void> {
        const consumer = this.db.getConnection().consumer({ groupId: name });
        await consumer.connect();
        await consumer.subscribe({
            topic
        });
        this.consumers[name] = consumer;
    }

    public listenerInit(name: string, event: any, func: Function): void {
        this.getConsumer(name).on(event, async (e) => {
            func();
        });
    }

    private getProducer(name: string): Producer {
        return this.producers[name];
    }

    private getConsumer(name: string): Consumer {
        return this.consumers[name];
    }

    public async sendMessage(
        name: string,
        topic: string,
        data: KafkaData
    ): Promise<void> {
        console.log(data);
        console.log(this.getProducer(name));
        await this.getProducer(name).send({
            topic,
            messages: [{ value: JSON.stringify(data) }]
        });
    }

    public async receiveMessage(name: string) {
        await this.getConsumer(name).run({
            eachMessage: this.messageFuncs[name]
        });
    }

    public async init(): Promise<void> {
        for (let name in this.producersName) await this.producerInit(name);
        for (let name in this.consumersName)
            await this.consumerInit(name, name);
        this.listenerInit(
            "memberUserCreate",
            "consumer.end_batch_process",
            () => console.log("Member create finish!")
        );
        this.listenerInit(
            "memberUserDelete",
            "consumer.end_batch_process",
            () => console.log("Member delete finish!")
        );
        for (let name in this.consumersName) await this.receiveMessage(name);
    }
}

export default KafkaDao;
