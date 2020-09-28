declare namespace NodeJS {
    interface ProcessEnv {
        /** node environment */
        NODE_ENV: string;
        PORT: number;
        DATABASE: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_HOST: string;
        DB_DIALECT: string;
        JWT_SECRET_KEY: string;
        REDIS_HOST: string;
        REDIS_PORT: string;
    }
}
