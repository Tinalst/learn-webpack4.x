const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackMerge = require('webpack-merge');
const common = require('./webpack.common.conf');

module.exports = webpackMerge(common, {
    devtool: "source-map", //====== 配置是否生成以及如何生成source map
    // eval : 能找到对应js文件的行数但是代码被压缩过了，但是找不到css对应行数，因为没有对loader进行映射
    // source-map: 找到与源代码一样的行数，打包后会生成map文件 ，支持js调试 推荐生产环境下使用 最完整的
    // cheap-module-eval-source-map :推荐开发的时候使用
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, //====== 配置提取css文件单独打包 ②,
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer') // (必须添加浏览器版本设置)浏览器版本设置在package.json的browserlist里
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [ //====== 配置清除文件
        new CleanWebpackPlugin({  // 默认删除output.path目录中的所有文件
            verbose: true         // 将日志写入控制台
        }),
        new MiniCssExtractPlugin({ //====== 配置提取css打包成单独文件 ②
            filename: '../css/[name].css'
        }),
        new OptimizeCssAssetsPlugin({//====== 配置优化css结构和压缩css
            assetNameRegExp: /\.css$/g,                   // 正则表达式，匹配需要优化或者压缩的资源名 默认: /\.css$/g
            cssProcessor: require('cssnano'),             // 用于压缩和优化css的处理器，默认值 cssnano
            cssProcessorPluginOptions: {                  // 传递给cssProcessor的插件选项，默认值 {}
                preset: ['default', {
                    discardComments: { removeAll: true }  // 去除注释
                }],
            },
            canPrint: true                                // 表示插件能够在console中打印信息，默认值是true

        }),
        new CopyWebpackPlugin([{ //====== 配置未被引用的静态资源保留 未被直接引用的资源需要另外放置一个文件放置重复输出
            from: path.resolve(__dirname, '../public/assets'),
            to: path.resolve(__dirname, '../build/assets')
        }])
    ]

});

