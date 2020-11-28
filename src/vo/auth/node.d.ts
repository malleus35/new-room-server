declare namespace NodeJS {
    interface ProcessEnv {
        /** node environment */
        NODE_ENV: string;
        PORT: number;
        DATABASE: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_HOST: string;
        DB_PORT: number;
        DB_DIALECT: string;
        JWT_SECRET_KEY: string;
        REDIS_HOST: string;
        REDIS_PORT: string;
        KAFKA_HOST_NAME_1: string;
        KAFKA_HOST_NAME_2: string;
        KAFKA_HOST_NAME_3: string;
        KAFKA_HOST_PORT_1: string;
        KAFKA_HOST_PORT_2: string;
        KAFKA_HOST_PORT_3: string;
    }
}
