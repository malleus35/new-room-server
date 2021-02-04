abstract class DBManager {
    protected connection: any;

    abstract getConnection(): any;

    abstract endConnection(): any;
}

export default DBManager;
