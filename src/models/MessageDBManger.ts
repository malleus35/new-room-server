import mongoose from "mongoose";
import DBManager from "@src/models/DBManager";

class MessageDBManager extends DBManager {
    constructor() {
        super();
        mongoose.connect("mongodb://localhost/test", {
            useNewUrlParser: true
        });
        this.connection = mongoose.connection;
    }

    getConnection(): mongoose.Connection {
        return this.connection;
    }

    async endConnection(): Promise<void> {
        await this.connection.close();
    }
}

export default MessageDBManager;
