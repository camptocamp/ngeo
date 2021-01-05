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
const ls = require('./ls.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [];
const entry = {};

const exampleFilenamePrefix = process.env.DEV_SERVER ? 'examples/' : '';

for (const filename of ls('examples/*.html')) {
  const name = filename.name;
  if (process.env.ONE_EXAMPLE && process.env.ONE_EXAMPLE !== name) {
    console.log('Skipping example', name, '!==', process.env.ONE_EXAMPLE);
    continue;
  }
  entry[name] = [
    './examples/common_dependencies.js', // Should be first
    'ngeo/mainmodule.js', // To have a big commons part
    `./examples/${name}.js`,
  ];

  plugins.push(
    new HtmlWebpackPlugin({
      template: `examples/${name}.html`,
      chunksSortMode: 'manual',
      filename: `${exampleFilenamePrefix}${name}.html`,
      chunks: ['commons', name],
    })
  );
}

// move data folder
plugins.push(
  new CopyWebpackPlugin([
    {
      from: 'examples/data/*',
      to: 'data',
      flatten: true,
    },
  ])
);

module.exports = {
  entry: entry,
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'commons',
    },
  },
  plugins: plugins,
};

if (!process.env.DEV_SERVER) {
  Object.assign(module.exports, {
    output: {
      path: path.resolve(__dirname, '../.build/examples-hosted/'),
    },
  });
}
