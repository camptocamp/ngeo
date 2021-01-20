// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const dest = path.resolve(__dirname, '../api/dist/');

const babelPresetEnv = [
  '@babel/preset-env',
  {
    targets: {
      browsers: ['> 0.5% in CH', '> 0.5% in FR', 'Firefox ESR', 'ie 11'],
    },
    modules: false,
    loose: true,
  },
];

module.exports = (env, argv) => {
  const library = argv.library ? argv.library : 'demo';
  return {
    entry: './api/index.js',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              comments: false,
              presets: [babelPresetEnv],
            },
          },
        },
      ],
    },
    output: {
      filename: 'api.js',
      path: dest,
      libraryTarget: 'umd',
      globalObject: 'this',
      libraryExport: 'default',
      library: library,
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: false,
          },
        }),
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './api/src/api.css',
            to: dest,
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        'api': path.resolve(__dirname, '../api/src'),
        '@geoblocks/proj': '@geoblocks/proj/src',
      },
    },
  };
};
