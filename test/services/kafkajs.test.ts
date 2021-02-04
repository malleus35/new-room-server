import { Consumer, Kafka, Producer } from "kafkajs";
import LogService from "@src/utils/LogService";

const logger = LogService.getInstance();

describe("kafkajs test", () => {
    let kafka: Kafka;
    let producer:Producer;
    let consumer:Consumer;
    beforeEach(async () => {
        kafka = new Kafka({
            clientId: "capstone-message",
            brokers: ["localhost:9095", "localhost:9096", "localhost:9097"]
        });
        producer = kafka.producer();
        consumer = kafka.consumer({ groupId: "message-test-group" });
        // Producing
        await producer.connect();
        // await producer.send({
        //     topic: "testTopic",
        //     messages: [
        //         { value: "Hello KafkaJS user!", partition: 1 }
        //     ]
        // });
        // await producer.disconnect();

        // Consuming
        await consumer.connect();
        await consumer.subscribe({
            topic: "testTopic",
            // fromBeginning: true
        });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    console.log({
                        topic,
                        partition,
                        offset: message.offset,
                        value: message.value?.toString()
                    });
                    expect(message.value?.toString()).toEqual(
                        "Hello KafkaJS user!"
                    );
                } catch (err) {
                    await consumer.disconnect();
                }
            }
        });
    }, 30000);
    it("basic connection kafka", async () => {
        console.log(producer);
        console.log(consumer)
        // await producer.send({
        //     topic: "testTopic",
        //     messages: [
        //         { value: "Hello KafkaJS user!", partition: 1 }
        //     ]
        // });
        // await producer.disconnect();
        // await consumer.disconnect();
    }, 30000);
});
