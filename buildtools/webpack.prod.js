const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


const resourcesRule = {
  test: /\.(jpeg|png|svg|ico|cur)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 1000,
      name: '[name].[hash:6].[ext]'
    }
  }
};

const fontRule = {
  test: /\.(eot|ttf|woff|woff2)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[hash:6].[ext]'
    }
  }
};

// Same signature as for webpack.dev.js
module.exports = function(UglifyJsPluginCache) {
  return {
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
        fontRule,
      ]
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: UglifyJsPluginCache,
          parallel: true,
          sourceMap: true,
          uglifyOptions: {
            compress: false
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
}
