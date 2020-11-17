import { ValidationError, Model, Op } from "sequelize";
import { AllStrictReqData, ReqData } from "@src/vo/auth/services/reqData";
import LogService from "@src/utils/LogService";
const logger = LogService.getInstance();

const DaoOpt = {
    Group: {
        findOne: ({ data, decoded, params }: ReqData) => {
            return {
                where: {
                    name: params?.groupName
                }
            };
        },
        findAll: ({ data, decoded, params }: ReqData) => {
            return {
                where: {
                    name: {
                        [Op.like]: `%${params?.groupName}%`
                    }
                }
            };
        }
    }
};

const DaoResult = {
    findOne: async <M extends Model>(
        modelFunc: Function,
        modelType: string,
        reqData: ReqData
    ) => {
        const modelOpt = DaoOpt[modelType][modelFunc.name](reqData);
        let result: M | null = null;
        try {
            result = await modelFunc(modelOpt);
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return result;
    },
    findAll: async <M extends Model>(
        modelFunc: Function,
        modelType: string,
        reqData: ReqData
    ) => {
        const modelOpt = DaoOpt[modelType][modelFunc.name](reqData);
        let result: M[] | null = null;
        try {
            result = await modelFunc(modelOpt);
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return result;
    }
};
const DaoFactory = {
    findOne: <M extends Model>(
        modelFunc: Function,
        modelType: string,
        reqData: ReqData
    ) => {
        const func = async (): Promise<M | string | null | undefined> => {
            let result: M | string | null | undefined = null;
            result = await DaoResult.findOne<M>(modelFunc, modelType, reqData);
            return result;
        };
        return func;
    },
    findAll: <M extends Model>(
        modelFunc: Function,
        modelType: string,
        reqData: AllStrictReqData
    ) => {
        const func = async (): Promise<M[] | string | null | undefined> => {
            let result: M[] | string | null | undefined = null;
            result = await DaoResult.findAll<M>(modelFunc, modelType, reqData);
            return result;
        };
        return func;
    }
};

export default DaoFactory;
