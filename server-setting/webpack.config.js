const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './public/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
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
                    'style-loader',  // style-loader的顺序必须之于css-loader之上
                                     // Adds CSS to the DOM by injecting a <style> tag
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
                test: /\.(png|jpg|gif|jpeg|svg)$/,   // 默认打包后的图片文件名会是一个hash图片大小没有任何压缩
                // use: 'file-loader'
                use:[{
                    loader: 'file-loader',
                    options: {
                        // name: '[path]bg.jpg'  // 打包后的图片存放在[path]代表的文件夹下
                        name: '[hash]bg.jpg',          // 为文件配置自定义文件名模板（默认值[hash].[ext]）
                                                 // [path]：相对于content的路径
                        // context: '../'        // 设置上下文，默认是相对webpack.config.js
                        // publicPath: 'http://www.abc.com/img' // 生成的图片路径为 http://www.abc.com/img/public/bg.jpg
                        outputPath: './img'      // 设置打包之后图片存放文件路径相对于output.path
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

            }
        ],
    },
    resolve: {
        alias: { //====== 设置访问本地第三方js库的路径  本地方式导入第三方js库步骤①
            jQuery: path.resolve(__dirname, 'public/js/jquery-3.3.1.min.js')
        }
    },
    plugins: [                      // 本地方式导入第三方js库步骤②
        new webpack.ProvidePlugin({ // 自动加载模块而不必到处import或者require
            jQ: 'jQuery'            // {key(在项目中使用的别名):value(第三方库的引用路径，如果没有设置resolve.alias.jQuery会在node_module中查找)}
        })
    ]

};
