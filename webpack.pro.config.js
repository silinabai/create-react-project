const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const AB_TEST = process.env.AB_ENV || '';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 查看webpack打包后的文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清除dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: {
        app: [
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom']
    },
    output: {
        path: path.join(__dirname, './dist/' + AB_TEST),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/'
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
                use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.DefinePlugin({
            'AB_ENV': JSON.stringify(process.env.AB_ENV), // 定义全局变量
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
        }),
        new webpack.optimize.SplitChunksPlugin({
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }),
        new UglifyJSPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
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
    devtool: 'eval-cheap-module-source-map', // 查看报错
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
