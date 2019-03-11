const path = require('path');

module.exports = {
    entry: './public/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {     // 配置 webpack-dev-server
        contentBase: './build', // 设置服务器访问的基本路径
        host: 'localhost',      // 服务器ip地址
        port: 8080,             // 端口
        open: true              // 自动打开页面
    },
    module: {
        rules: [      // loader配置
            {
                test: /\.css$/,      // 用于标识应该被相应loader进行转换的某个或某些文件
                use: [               // 表示进行转换时，应该使用哪个loader
                    'style-loader',  // style-loader的顺序必须之于css-loader之上
                                     // Adds CSS to the DOM by injecting a <style> tag
                    'css-loader'
                ]
            }
        ]
    }

};
