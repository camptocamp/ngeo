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

process.traceDeprecation = true;

const resourcesRule = {
  test: /\.(jpeg|png|ico|cur|eot|ttf|woff|woff2)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        esModule: false,
        name: '[name].[ext]',
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
            name: '[name].[ext]',
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

new webpack.LoaderOptionsPlugin({
  debug: false,
});

module.exports = function () {
  return {
    mode: 'development',
    devtool: 'inline-cheap-source-map', // 'cheap-eval-source-map',
    output: {
      filename: '[name].js',
    },
    module: {
      rules: [resourcesRule, svgRule],
    },
  };
};
