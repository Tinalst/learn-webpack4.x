const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');

const common = require('./webpack.common.conf'); // 引入公用文件
const enrties = require('./enrties');

module.exports =  webpackMerge(common, {
    devtool: "cheap-module-eval-source-map", //====== 配置是否生成以及如何生成source map
                                             // eval : 能找到对应js文件的行数但是代码被压缩过了，但是找不到css对应行数，因为没有对loader进行映射
                                             // source-map: 找到与源代码一样的行数，打包后会生成map文件 ，支持js调试 推荐生产环境下使用 最完整的
                                             // cheap-module-eval-source-map :推荐开发的时候使用
    devServer: { //====== 配置 webpack-dev-server
        contentBase: './build/', // 设置服务器访问的基本路径
        host: 'localhost',      // 服务器ip地址
        port: 8080,             // 端口
        open: true,             // 自动打开页面
        hot: true,              // 模块热替换 步骤①
        hotOnly: true           // 模块热替换默认js改变会刷新页面，设置hotOnly就不会刷新页面
                                // 关于js模块热更需要在响应的js文件主动接收
    },
    module: {
      rules: [
          {       //====== 配置编译css文件
              test: /\.css$/,            // 用于标识应该被相应loader进行转换的某个或某些文件
              use: [                     // 表示进行转换时，应该使用哪个loader
                  // 'style-loader',     // style-loader的顺序必须之于css-loader之上
                  // Adds CSS to the DOM by injecting a <style> tag
                  // ps: 模块热替换关于样式是作用于style-loader的，所以如果想要样式出现热更新需要使用style-loader
                  // MiniCssExtractPlugin.loader, //====== 配置提取css文件单独打包 ②
                  // 'css-loader',
                  'happypack/loader?id=happyCss'
              ]
          },
      ]
    },
    plugins: Object.keys(enrties).map(key => {
        return new HtmlWebPackPlugin({ //====== 配置根据html模板自动生成html
            template: './public/pages/' + key +'/index.html',  // 指定html模板
            filename: path.join(__dirname,'..', 'build/pages/' + key + '.html'),                    // 指定自动生成的html文件名
            minify: {
                minimize: true,               // 是否打包为最小值
                removeAttributeQuotes: true,  // 去除attribute引号
                removeComments: true,         // 去除注释
                collapseWhitespace: true,     // 去除空格 变成一行
                minifyCSS: true,              // 压缩html页面里的样式 变成一行
                minifyJS: true,               // 压缩html内的js 变成一行
                // removeEmptyElements: true     // 清理内容为空的元素
            },
            hash: true,                        // 引入产出资源的时候加上哈希避免缓存，
            chunks: [key]                      // 设置页面模板需要对应的js脚本，如果不加这一行，每个页面就会引入所有的js脚本
        })
    }).concat([ //====== 配置清除文件
        new webpack.NamedModulesPlugin(), // 模块热替换 步骤②
        new webpack.HotModuleReplacementPlugin(), // 模块热替换 步骤③
        new HappyPack({
            id: 'happyCss',
            threads: 5,
            loaders: ['style-loader!css-loader']
        })
    ])

});

