const path = require('path');

module.exports = {
  entry: { // 多入口
    pageOne: './public/pageone/index.js',
    pageTwo: './public/pagetwo/index.js'
  },
  output: {
    filename: '[name].js', // name：代表entry对象属性名
    path: path.resolve(__dirname, 'build') // 打包到/learn-webpack4.x/single-entry/multiple-files/build/下
  }
}