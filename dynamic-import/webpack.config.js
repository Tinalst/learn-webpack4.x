const path = require('path');

module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  optimization: {
    usedExports: true
  }
};
