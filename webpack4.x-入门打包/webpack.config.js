const path = require('path'); //1. 用于写路径

module.exports = {
    entry: './public/index.js', // 2. 入口文件路径
    output: {
        path: path.resolve(__dirname, 'build'), // 3. 出口文件夹的名称
        filename: 'bundle.js' // 存放文件的名称
    }
}