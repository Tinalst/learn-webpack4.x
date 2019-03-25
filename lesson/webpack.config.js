const path = require('path');

module.exports = {
  mode: 'development', // 模式：<[production] || development || none> 默认production
  entry: {
    main: './src/pages/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(jpeg|png|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 占位符 placeholder
            name: '[name]_[hash].[ext]', // 老的文件的名字.老的文件的后缀
            outputPath: 'images/',        // 文件输出到dist/images/下,
            limit: 2048
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }
      }
    ]
  }

};