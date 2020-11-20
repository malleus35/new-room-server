import KafkaManager from "@src/models/KafkaManager";
import Dao from "@src/dao/Dao";
import { Consumer, Producer } from "kafkajs";
import KafkaData from "@src/vo/auth/services/kafkaData";
// import MemberDao from "./member/MemberDao";

interface producers {
    [attr: string]: Producer;
}

interface consumers {
    [attr: string]: Consumer;
}

class KafkaDao extends Dao {
    protected db: KafkaManager;
    private producers: producers;
    private consumers: consumers;
    private constructor() {
        super();
        this.db = KafkaManager.getInstance();
        this.producers = {};
        this.consumers = {};
        const firstInit = async () => await this.init();
        firstInit();
    }

    protected async connect() {
        this.db = KafkaManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }

    private async producerInit(): Promise<void> {
        const userMemberProducer = this.db.getConnection().producer();
        await userMemberProducer.connect();
        this.producers["userMember"] = userMemberProducer;
    }

    private async consumerInit(): Promise<void> {
        const memberUserConsumer = this.db
            .getConnection()
            .consumer({ groupId: "memberUser" });
        await memberUserConsumer.connect();
        await memberUserConsumer.subscribe({
            topic: "memberUser"
        });
        this.consumers["memberUser"] = memberUserConsumer;
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
        await this.getProducer(name).send({
            topic,
            messages: [{ value: JSON.stringify(data) }]
        });
    }

    public async receiveMessage(name: string) {
        await this.getConsumer(name).run({
            eachMessage: async ({ topic, partition, message }: any) => {
                const received = JSON.parse(message.value);
                // await this.sendMessage("userMember", "userMember", {
                //     msg: "User Kafka Test Success!"
                // });
                console.log(received);
            }
        });
    }

    public async init(): Promise<void> {
        await this.producerInit();
        await this.consumerInit();
        this.getConsumer("memberUser").on("consumer.fetch", async (e) => {
            console.log(e);
        });
        await this.receiveMessage("memberUser");
    }
}

export default KafkaDao;
