/** name of global object for accessing this module */
var libraryName = "TestEventEmitter";

/** name of the output bundled file */
var bundleFileName = "test-event-emitter.umd.js";


var path = require("path");
var MyJsMinifierWebpackPlugin = require('./tools/my-js-minifier-webpack-plugin');

var PATHS = {
    entryPoint: path.resolve(__dirname, 'src/index.ts'),
    bundles: path.resolve(__dirname, '_bundles'),
}

var entryObject = {};
var bundleName = bundleFileName.split('.')[0];
entryObject[bundleName] = [PATHS.entryPoint];

var config = {
    mode:'development',
    devtool: 'source-map',
    entry: entryObject,
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: PATHS.bundles,
        filename: bundleFileName,
        libraryTarget: 'umd',
        library: libraryName,
        umdNamedDefine: true
    },
    module:{
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins:[
        new MyJsMinifierWebpackPlugin({
            outFileName:"./_bundles/" + bundleFileName,
            jsFiles:["./_bundles/" + bundleFileName],
            minifierOptions:{}
        }),
    ]
}

module.exports = config;