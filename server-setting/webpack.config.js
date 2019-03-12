const path = require('path');

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
            }
        ]
    }

};
