const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');

const common = require('./webpack.common.conf'); // 引入公用文件

module.exports =  webpackMerge(common, {
    devtool: "cheap-module-eval-source-map", //====== 配置是否生成以及如何生成source map
    // eval : 能找到对应js文件的行数但是代码被压缩过了，但是找不到css对应行数，因为没有对loader进行映射
    // source-map: 找到与源代码一样的行数，打包后会生成map文件 ，支持js调试 推荐生产环境下使用 最完整的
    // cheap-module-eval-source-map :推荐开发的时候使用
    devServer: { //====== 配置 webpack-dev-server
        contentBase: './build', // 设置服务器访问的基本路径
        host: 'localhost',      // 服务器ip地址
        port: 8080,             // 端口
        open: true,             // 自动打开页面
        hot: true,              // 模块热替换 步骤①
        hotOnly: true           // 模块热替换默认js改变会刷新页面，设置hotOnly就不会刷新页面
                                // 关于js模块热更需要在响应的js文件主动接收
    },
    resolve: {
        alias: { //====== 设置访问本地第三方js库的路径  本地方式导入第三方js库步骤①
            jQuery: path.resolve(__dirname, '../public/js/jquery-3.3.1.min.js')
        }
    },
    plugins: [ //====== 配置清除文件
        new CleanWebpackPlugin({  // 默认删除output.path目录中的所有文件
            verbose: true         // 将日志写入控制台
        }),
        new webpack.ProvidePlugin({  // ======本地方式导入第三方js库步骤②
            // 自动加载模块而不必到处import或者require
            jQ: 'jQuery'             // {key(在项目中使用的别名):value(第三方库的引用路径，如果没有设置resolve.alias.jQuery会在node_module中查找)}
        }),
        new webpack.NamedModulesPlugin(), // 模块热替换 步骤②
        new webpack.HotModuleReplacementPlugin() // 模块热替换 步骤③
    ]

});

