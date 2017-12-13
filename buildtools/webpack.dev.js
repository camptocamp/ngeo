const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commons = require('./webpack.commons.js');


const resourcesRule = {
  test: /\.(eot|jpeg|ttf|woff|woff2)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: 'build/[path][name].[ext]'
    }
  }
};

const loaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
  debug: false
});


module.exports = webpackMerge(commons.config, {
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      resourcesRule,
    ]
  },
});
