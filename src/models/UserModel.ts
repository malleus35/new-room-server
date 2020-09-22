import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import { UserModelTypes } from "@src/customTypes/auth/models/UserModel";
import { SignUpTypes } from "@src/customTypes/auth/controllers/Signup";

interface UserCreationAttributes
    extends Optional<SignUpTypes.SignUpBody, "id"> {}
class UserModel
    extends Model<SignUpTypes.SignUpBody, UserCreationAttributes>
    implements SignUpTypes.SignUpBody {
    private id!: number;
    private name!: string;
    private email!: string;
    private pwd!: string;
    private grade!: number;
    private school!: string;
    private stdNum!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static init(connection: Sequelize): Model {
        const opt: UserModelTypes.IBaseUserTableOptions = {
            sequelize: connection,
            tableName: "User"
        };
        return super.init(UserModelTypes.attr, opt);
    }

    static sync() {
        return super.sync();
    }

    static create(value: SignUpTypes.SignUpPostBody) {
        return super.create(value);
    }
}

export default UserModel;
