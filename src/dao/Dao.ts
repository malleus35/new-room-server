import DBManager from "@src/models/DBManager";

class Dao {
    protected db: DBManager | undefined;

    protected static instance: any;
    protected constructor() {}

    protected static setSingleton(): void {
        if (this.instance == null) this.instance = new this();
    }
    static getInstance(): any {
        if (this.instance == null) this.setSingleton();
        return this.instance;
    }
}

export default Dao;
