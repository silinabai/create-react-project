const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const AB_TEST = process.env.AB_ENV;

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, './dist/' + AB_TEST),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.scss$/, // 将 JS 字符串生成为 style 节点loader: // 将 CSS 转化成 CommonJS 模块loader: // 将 Sass 编译成 CSS]
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192 // 小于等于8k的图片直接转成base64插入HTML，减少HTTP请求
                    }
                }]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.DefinePlugin({
            'AB_ENV': JSON.stringify(process.env.AB_ENV)
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888, // 运行后的端口号
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 9000,
        host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问
        historyApiFallback: true,
        proxy: {
            '/devapi': {
                target: '',
            },
            '/testapi': {
                target: '',
            },
            './papi': {
                target: '',
            }
        }
    },
    devtool: 'inline-source-map', // 查看报错
    resolve: {
        alias: {
            Pages: path.join(__dirname, 'src/pages'),
            Components: path.join(__dirname, 'src/components'),
            Src: path.join(__dirname, 'src'),
            Utils: path.join(__dirname, 'src/utils'),
            Styles: path.join(__dirname, 'src/styles'),
        },
        extensions: ['.js', '.json', '.scss', '.sass', '.css']
    }
};
