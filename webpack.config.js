const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack')
module.exports = {
    mode: "production",
    target: "node",
    entry: "./src/app.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.bundle.js"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            "@src": path.resolve(__dirname, "src"),
            "@env": path.resolve(__dirname, "envs")
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: [/node_modules/, /test/],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-typescript"
                        ],
                        plugins: [
                            "@babel/proposal-class-properties",
                            "@babel/proposal-object-rest-spread"
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: "./envs/.env.production", // Path to .env file (this is the default)
            safe: true,
            silent: true // load .env.example (defaults to "false" which does not use dotenv-safe)
        })
    ]
};