const path = require('path');

module.exports = {
  entry: [  // 多文件
    './public/index1.js',
    './public/index2.js'
  ],
  output: { // 单入口（入口指的是访问入口)
    path: path.resolve(__dirname, 'build'),// 讲路径或路径片段序列成绝对路径 __dirname: 表示被执行文件的绝对路径不包含执行文件本身
                                           // path: 文件打包后的存放路径 /learn-webpack4.x/single-entry/multiple-files/build/...
    filename: 'bundle.js' // 打包后的文件名 所以结合以上最终产生的是/learn-webpack4.x/single-entry/multiple-files/build/bundle.js

  }
};