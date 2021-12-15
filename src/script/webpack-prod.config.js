'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = function(mode, context){
    const rootFolder = path.resolve(__dirname, "../../");
    return {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: "[name].[chunkhash].js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(sass|css|scss)$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { 
                        loader: 'css-loader'
                     },
                     { 
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [ 'autoprefixer', {}, ],
                                ],
                            },
                        }
                      },
                      { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: 'url-loader?limit=10000'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/../index.html',
            favicon : path.resolve(rootFolder, 'public/favicon.png'),
            inlineSource: '.(js|css)$'
        }),
        new webpack.DefinePlugin({
            'CONTEXT': JSON.stringify(context),
            'BASE_URL': JSON.stringify('https://apbuat.airtelbank.com:5050/apb/utilities/')
        })
    ]
};

};