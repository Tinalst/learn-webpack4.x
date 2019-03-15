const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
    plugins: [ //====== 配置清除文件
        new webpack.NamedModulesPlugin(), // 模块热替换 步骤②
        new webpack.HotModuleReplacementPlugin() // 模块热替换 步骤③
    ]

});

