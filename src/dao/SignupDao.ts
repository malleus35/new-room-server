import { Model, UniqueConstraintError, ValidationError } from "sequelize";
import argon2 from "argon2";
import AuthDBManager from "@src/models/AuthDBManager";
import User from "@src/models/UserModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { AllStrictReqData, AuthReqData } from "@src/vo/auth/services/reqData";
import KafkaManager from "@src/models/KafkaManager";
import KafkaDao from "./KafkaDao";

const logger = LogService.getInstance();

class SignupDao extends Dao {
    private constructor() {
        super();
        this.db = AuthDBManager.getInstance();
    }

    protected async connect() {
        this.db = await AuthDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async findOne({
        data,
        decoded,
        params
    }: AuthReqData): Promise<Model | string | null | undefined> {
        let result: Model | null = null;
        try {
            result = await User.findOne({
                where: {
                    email: data.email
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return result;
    }

    async save({
        data,
        decoded,
        params
    }: AuthReqData): Promise<User | string | null | undefined> {
        let kafkaData: string | undefined = "";
        // const kafka = KafkaManager.getInstance();
        // const producer = kafka.getConnection().producer();
        // const consumer = kafka
        //     .getConnection()
        //     .consumer({ groupId: "userMember" });

        // const producerConnect = async () => {
        //     await producer.connect();
        // };

        // const consumerConnect = async () => {
        //     await consumer.connect();
        //     await consumer.subscribe({
        //         topic: "memberUser",
        //         fromBeginning: true
        //     });
        // };

        // const sendMessage = async (data: AuthReqData["data"]) => {
        //     console.log(data);
        //     await producer.send({
        //         topic: "userMember",
        //         messages: [{ value: JSON.stringify(data) }]
        //     });
        // };

        // const receiveMessage = async () => {
        //     await consumer.run({
        //         eachMessage: async ({ topic, partition, message }) => {
        //             kafkaData = message.value?.toString();
        //             console.log(kafkaData);
        //             console.log(message);
        //         }
        //     });
        // };

        let newUser: User | null = null;
        console.log(data);
        data.pwd = await argon2.hash(data.pwd);
        try {
            newUser = await User.create(data);
            await KafkaDao.getInstance().sendMessage(
                "userMember",
                "userMember",
                data
            );
        } catch (err) {
            logger.error(err);
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return newUser;
    }

    async update({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<any | null | undefined> {
        let updateMember: any | null = null;
        try {
            updateMember = await User.update(
                { ...data },
                { where: { ...params } }
            );
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return updateMember;
    }

    async delete({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<number | string | null | undefined> {
        let deleteMember: number | null = null;
        //Add Kafka connection to Auth server because of deleting member
        try {
            deleteMember = await User.destroy({
                where: {
                    ...params
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return deleteMember; //1 is success, 0 or undefined are fail
    }
}

export default SignupDao;
