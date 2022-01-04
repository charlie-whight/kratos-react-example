const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: { path: path.join(__dirname, "build"), filename: "bundle.js", publicPath: ""},
    mode: process.env.NODE_ENV || "development",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000,
        open: true,
        historyApiFallback: true,
        allowedHosts: ["public-kratos-react.external.rvu.cloud", "localhost", "127.0.0.1"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            templateParameters: {
                assets: {
                    publicPath: "/app"
                },
                pageTitle: '',
            },
        }),
    ],
};