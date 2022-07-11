// The MIT License (MIT)
//
// Copyright (c) 2019-2022 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    vendor: [path.resolve(__dirname, '../deps.js')],
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].js',
    library: '[name]',
  },
  module: {
    rules: [
      {
        test: /.*\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            comments: false,
            presets: [
              [
                require.resolve('@babel/preset-env'),
                {
                  targets: {
                    browsers: require('./webpack.share').browsers,
                  },
                  modules: false,
                  loose: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dist/vendor-manifest.json'),
      name: '[name]',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new webpack.ProvidePlugin({
      // Make sure that Angular finds jQuery and does not fall back to jqLite
      // See https://github.com/webpack/webpack/issues/582
      'window.jQuery': 'jquery',
      // For Bootstrap
      'jQuery': 'jquery',
      // For own scripts
      $: 'jquery',
    }),
  ],
  resolve: {
    alias: {
      'jquery-ui/datepicker': 'jquery-ui/ui/widgets/datepicker', // For angular-ui-date
    },
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
      }),
    ],
    sideEffects: false,
  },
};
