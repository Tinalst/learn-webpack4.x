const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


/***
 * 返回绝对路径
 * @param dir
 * @return {*}
 */
function resolve(dir){
    return path.join(__dirname, '..', dir);
}

let enrties = {
    index: 'index',
    pageone: 'pageone'
};

module.exports = {
    entry: {
        index: './public/pages/index/index.js',
        pageone: './public/pages/pageone/index.js'
    },
    output: {
        filename: '[name].bundle.[hash].js',         // 出口文件名称

        path: path.resolve(__dirname, '../build/pages')  // 用于存放出口文件的文件夹路径
    },
    module: {
        noParse: /public\/js\/jquery-3.3.1.min.js/, // 构建优化
        rules: [ //====== loader配置
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
            {       //====== 配置编译less文件
                test: /\.less$/,
                use: [
                    // 'style-loader',
                    // 'css-loader',
                    // 'less-loader'      // 支持编译less(前提是安装less)
                    'happypack/loader?id=happyLess'
                ]
            },
            {       //====== 配置编译scss文件
                test: /\.scss$/,
                use: [
                    // 'style-loader',
                    // 'css-loader',
                    // 'sass-loader',   // 支持编译sass文件(前提是安装node-sass)
                    // { //====== 配置添加浏览器前缀
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         plugins: [
                    //             require('autoprefixer') // (必须添加浏览器版本设置)浏览器版本设置在package.json的browserlist里
                    //         ]
                    //     }
                    // },
                  'happypack/loader?id=happyScss'
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
                        outputPath: '../images'      // 设置打包之后图片存放文件路径相对于output.path
                    }
                }]

            },
            {
                //====== 字体文件处理
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',  // ps: happypack对file-loader的支持不友好，不建议使用
                    options: {
                        outputPath: '../fonts'
                    }
                }]

            },
            {   //====== 配置es6处理 ①下载babel-loader、 @babel/core、@babel/preset-env ②配置 ③ 新建babelrc文件 配置转换规则  { "presets": ['@babel/preset-env']}
                test: /\.js$/,
                include: [resolve('public')], //构建优化
                exclude: /node_modules/, // 除了/node_modules/文件下外的js文件都进行babel-loader处理。 构件优化
                // use: 'babel-loader'      // 结合babelrc配置文件使用
                // use: [{                     // 如果不想配置babelrc文件就这样配
                    // loader: 'babel-loader?cacheDirectory=true', // cacheDirectory=true 设置缓存，优先使用默认缓存目录node_module/.cache/babel-loader
                    // options: {
                    //     presets: ['@babel/preset-env']
                    // }
                // }],
                loader: 'happypack/loader?id=happyBabel' // 构建优化
            },
            {
                test: /\.(html)$/,
                include: [resolve('public')], //构建优化
                exclude:  /node_modules/,
                use: [
                    // {
                    //     loader: 'html-loader',
                    //     options: {
                    //         attrs: ['img:src', 'img:data-src']
                    //     }
                    // },
                    'happypack/loader?id=happyHtml'
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.js'], // 指定文件尝试后缀列表，减少尝试次数，优化构建速度
        modules: [ // 配置在哪些目录下寻找第三方模块,优化构件速度
          resolve('public'),
          resolve('node_modules')
        ],
        alias: { //====== 设置访问本地第三方js库的路径  本地方式导入第三方js库步骤①
            jQuery: path.resolve(__dirname, '../public/js/jquery-3.3.1.min.js')
        }
    },
    plugins: Object.keys(enrties).map(key => {
        return new HtmlWebPackPlugin({ //====== 配置根据html模板自动生成html
            template: './public/pages/' + key +'/index.html',  // 指定html模板
            filename: key + '.[hash].html',                    // 指定自动生成的html文件名
            minify: {
                minimize: true,               // 是否打包为最小值
                removeAttributeQuotes: true,  // 去除attribute引号
                removeComments: true,         // 去除注释
                collapseWhitespace: true,     // 去除空格 变成一行
                minifyCSS: true,              // 压缩html页面里的样式 变成一行
                minifyJS: true,               // 压缩html内的js 变成一行
                removeEmptyElements: true     // 清理内容为空的元素
            },
            hash: true,                        // 引入产出资源的时候加上哈希避免缓存，
            chunks: [key]                      // 设置页面模板需要对应的js脚本，如果不加这一行，每个页面就会引入所有的js脚本
        })
    }).concat([ //====== 配置清除文件
        new webpack.ProvidePlugin({  // ======本地方式导入第三方js库步骤②
            // 自动加载模块而不必到处import或者require
            jQ: 'jQuery'             // {key(在项目中使用的别名):value(第三方库的引用路径，如果没有设置resolve.alias.jQuery会在node_module中查找)}
        }),
        new HappyPack({  // 构建优化
            id: 'happyBabel',
            threads: 3,
            loaders:[
                {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true
                    }
                }
            ]
        }),
        new HappyPack({
            id: 'happyScss',
            threads: 4,
            loaders: ['style-loader!css-loader!sass-loader!postcss-loader']
        }),
        new HappyPack({
            id: 'happyCss',
            threads: 5,
            loaders: ['style-loader!css-loader']
        }),
        new HappyPack({
            id: 'happyLess',
            threads: 6,
            loaders: [ 'style-loader!css-loader!less-loader']
        }),
        new HappyPack({
            id: 'happyHtml',
            threads: 7,
            loaders: [
                {
                    loader: 'html-loader',
                    query: {
                        attrs: ['img:src', 'img:data-src']
                    }
                }
            ]
        }),
        // new BundleAnalyzerPlugin()
    ])

};
