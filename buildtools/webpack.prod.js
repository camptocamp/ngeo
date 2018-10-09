const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const resourcesRule = {
  test: /\.(jpeg|png|ico|cur|eot|ttf|woff|woff2)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[hash:6].[ext]'
    }
  }
};

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash:6].js'
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  module: {
    rules: [
      resourcesRule,
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            sequences: false, // workaround uglify bug with sequences
          }
        }
      })
    ]
  },
  resolve: {
    alias: {
      'goog/asserts': path.resolve(__dirname, '../src/goog.asserts.prod.js'),
      'goog/asserts.js': path.resolve(__dirname, '../src/goog.asserts.prod.js'),
    }
  },
};
