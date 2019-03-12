const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './public/index.js',
    output: {
        filename: 'bundle[name][hash].js',
        path: path.resolve(__dirname, 'build')
    },
    devtool: "source-map", //====== 配置是否生成以及如何生成source map
                     // eval : 能找到对应js文件的行数但是代码被压缩过了，但是找不到css对应行数，因为没有对loader进行映射
                     // source-map: 找到与源代码一样的行数，打包后会生成map文件 ，支持js调试
    devServer: { //====== 配置 webpack-dev-server
        contentBase: './build', // 设置服务器访问的基本路径
        host: 'localhost',      // 服务器ip地址
        port: 8080,             // 端口
        open: true              // 自动打开页面
    },
    module: {
        rules: [ //====== loader配置
            {       //====== 配置编译css文件
                test: /\.css$/,      // 用于标识应该被相应loader进行转换的某个或某些文件
                use: [               // 表示进行转换时，应该使用哪个loader
                    // 'style-loader',  // style-loader的顺序必须之于css-loader之上
                                     // Adds CSS to the DOM by injecting a <style> tag
                    MiniCssExtractPlugin.loader, //====== 配置提取css文件单独打包 ②
                    'css-loader'
                ]
            },
            {       //====== 配置编译less文件
                test: /\.less$/,
                use: [
                  'style-loader',
                  'css-loader',
                  'less-loader'      // 支持编译less(前提是安装less)
                ]
            },
            {       //====== 配置编译scss文件
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',   // 支持编译sass文件(前提是安装node-sass)
                    { //====== 配置添加浏览器前缀
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                              require('autoprefixer') // (必须添加浏览器版本设置)浏览器版本设置在package.json的browserlist里
                            ]
                        }
                    }
                ]
            },
            {      //===== 文件处理——配置编译图片
                test: /\.(png|jpg|gif|jpeg)$/,   // 默认打包后的图片文件名会是一个hash图片大小没有任何压缩
                // use: 'file-loader'
                use:[{
                    loader: 'file-loader',
                    options: {
                        // name: '[path]bg.jpg'  // 打包后的图片存放在[path]代表的文件夹下
                        name: '[hash]bg.jpg',          // 为文件配置自定义文件名模板（默认值[hash].[ext]）
                                                 // [path]：相对于content的路径
                        // context: '../'        // 设置上下文，默认是相对webpack.config.js
                        // publicPath: 'http://www.abc.com/img' // 生成的图片路径为 http://www.abc.com/img/public/bg.jpg
                        outputPath: './images'      // 设置打包之后图片存放文件路径相对于output.path
                    }
                }]

            },
            {
                //====== 字体文件处理
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: './fonts'
                    }
                }]

            },
            {   //====== 配置es6处理 ①下载babel-loader、 @babel/core、@babel/preset-env ②配置 ③ 新建babelrc文件 配置转换规则  { "presets": ['@babel/preset-env']}
                test: /\.js$/,
                exclude: /node_modules/, // 除了/node_modules/文件下外的js文件都进行babel-loader处理
                // use: 'babel-loader'      // 结合babelrc配置文件使用
                use: [{                     // 如果不想配置babelrc文件就这样配
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }]
            },
            {
                test: /\.(html)$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src']
                    }
                }]
            }
        ],
    },
    resolve: {
        alias: { //====== 设置访问本地第三方js库的路径  本地方式导入第三方js库步骤①
            jQuery: path.resolve(__dirname, 'public/js/jquery-3.3.1.min.js')
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
        new HtmlWebPackPlugin({ //====== 配置根据html模板自动生成html
            template: './public/index.html',  // 指定html模板
            filename: 'webpack.html',         // 指定自动生成的html文件名
            minify: {
                minimize: true,               // 是否打包为最小值
                removeAttributeQuotes: true,  // 去除attribute引号
                removeComments: true,         // 去除注释
                collapseWhitespace: true,     // 去除空格 变成一行
                minifyCSS: true,              // 压缩html页面里的样式 变成一行
                minifyJS: true,               // 压缩html内的js 变成一行
                removeEmptyElements: true     // 清理内容为空的元素
            },
            hash: true                        // 引入产出资源的时候加上哈希避免缓存
        }),
        new MiniCssExtractPlugin({ //====== 配置提取css打包成单独文件 ②
            filename: './css/[name].css'
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
            from: __dirname + '/public/assets',
            to: __dirname + '/build/assets'
        }])
    ]

};
