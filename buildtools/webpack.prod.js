const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


const resourcesRule = {
  test: /\.jpeg$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'build/[name].[hash:20].[ext]'
    }
  }
};

const fontRule = {
  test: /\.(eot|ttf|woff|woff2)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: 'build/[name].[hash:20].[ext]'
    }
  }
};

const babelUse = {
  loader: 'babel-loader',
  options: {
    presets: ['es2015'],
    plugins: ['angularjs-annotate'],
  }
}

const ngeoRule = {
  test: /ngeo\/src\/.*\.js$/,
  use: babelUse,
}

const examplesRule = {
  test: /ngeo\/examples\/.*\.js$/,
  use: babelUse,
}

module.exports = {
  output: {
    filename: '[name].[chunkhash:20].js'
  },
  module: {
    rules: [
      resourcesRule,
      fontRule,
      ngeoRule,
      examplesRule,
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
    }),
  ],
  resolve: {
    alias: {
      'goog/asserts': path.resolve(__dirname, '../src/goog.asserts.prod.js'),
      'goog/asserts.js': path.resolve(__dirname, '../src/goog.asserts.prod.js'),
    }
  },
};
