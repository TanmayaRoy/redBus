'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = function(mode, context){
    const rootFolder = path.resolve(__dirname, "../../");
    console.log('rootFolder>>',rootFolder);
    return {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.resolve(rootFolder, 'dist'),
            hot: true,
            host: 'localhost',
            historyApiFallback: true
        },
        entry: './src/index.js',
        output: {
            path: path.resolve(rootFolder, 'dist'),
            filename: "[name].bundle.js",
            publicPath: "/",
            pathinfo: false
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns:[path.resolve(rootFolder, 'dist')]
            }),
            new HtmlWebpackPlugin({
                template: __dirname + '/../index.html',
                favicon : path.resolve(rootFolder, 'public/favicon.png'),
                inject: 'body',
                filename: 'index.html'
            }),
            new webpack.DefinePlugin({
              'MODE': JSON.stringify(mode),
              'CONTEXT': JSON.stringify(context),
              'BASE_URL': JSON.stringify('https://apbuat.airtelbank.com:5050/apb/utilities/')
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css",
                ignoreOrder: false
            }),
           
        ],
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.js$|jsx/,
                    exclude:  [
                        path.resolve(__dirname, "../../../node_modules/")
                    ],
                    use : [
                        'babel-loader'
                    ]
                },
                {
                  test: /\.css$/,
                   use: [
                      MiniCssExtractPlugin.loader,
                      "css-loader"
                    ]
                },
                {
                  test: /\.scss$/,
                  use : [
                      MiniCssExtractPlugin.loader,
                      "css-loader",
                      "resolve-url-loader",
                      "sass-loader",
                  ]
                },
                {
                     test: /\.(png|jpg|gif|webp|woff|woff2|eot|ttf|otf|svg)$/,
                     use: [
                       'url-loader?limit=100000'
                     ]
                }
            ]

        }
    };
};
