// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
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

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const resourcesRule = {
  test: /\.(jpeg|png|ico|cur|eot|ttf|woff|woff2)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        esModule: false,
        name: '[name].[hash:6].[ext]',
      },
    },
  ],
};

const svgRule = {
  test: /\.svg$/,
  oneOf: [
    {
      resourceQuery: /url/,
      use: [
        {
          loader: 'file-loader',
          options: {
            esModule: false,
            name: '[name].[hash:6].[ext]',
          },
        },
        'svgo-loader',
      ],
    },
    {
      resourceQuery: /viewbox/,
      use: [
        {
          loader: 'svg-inline-loader',
          options: {
            removeSVGTagAttrs: false,
          },
        },
        './buildtools/svg-viewbox-loader',
        'svgo-loader',
      ],
    },
    {
      use: [
        {
          loader: 'svg-inline-loader',
          options: {
            removeSVGTagAttrs: false,
          },
        },
        'svgo-loader',
      ],
    },
  ],
};

module.exports = function () {
  return {
    mode: 'production',
    devtool: 'source-map',
    output: {
      filename: '[name].[chunkhash:6].js',
    },
    plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
    module: {
      rules: [resourcesRule, svgRule],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          exclude: /^(?!.*mapillary\.js$).*$/,
          parallel: true,
          terserOptions: {
            compress: false,
          },
        }),
      ],
    },
  };
};
