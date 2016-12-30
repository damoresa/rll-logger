const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");

module.exports = {
    entry: './index.ts',

    output: {
        path: path.join(__dirname, 'lib', 'bundle'),
        publicPath: '/',
        filename: 'rll-logger.umd.js',
        libraryTarget: 'umd',
        library: 'rll-logger'
    },

    devtool: 'none',

    resolve: {
        extensions: ['.ts', '.js']
    },

    externals: [/^\@angular\//],

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: [ path.resolve('node_modules') ]
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader?declaration=false',
                exclude: [/\.e2e\.ts$/]
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.resolve('./../src')
        ),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            options: {
                tslintLoader: {
                    resourcePath: 'src',
                    emitErrors: false,
                    failOnHint: false
                }
            }
        })
    ]
};
