const path = require('path');
const slsw = require('serverless-webpack');
const webpack = require('webpack');

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    module: {
      rules: [
        {
          test: /\.js$/,
          include: __dirname,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        }
      ]
    },
    // plugins: [
    //   new webpack.IgnorePlugin({
    //     resourceRegExp: /^pg-native$/
    //   })
    // ],
    output: {
      libraryTarget: 'commonjs',
      path: path.join(__dirname, '.webpack'),
      filename: '[name].js'
    }
  };