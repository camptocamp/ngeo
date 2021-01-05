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

const plugins = [];
const entry = {};

const exampleFilenamePrefix = process.env.DEV_SERVER ? 'contribs/gmf/examples/' : '';

for (const filename of ls('contribs/gmf/examples/*.html')) {
  const name = filename.name;
  entry[name] = [
    './contribs/gmf/examples/common_dependencies.js', // Should be first
    'gmf/mainmodule.js', // To have a big commons part
    `./contribs/gmf/examples/${name}.js`,
  ];
  plugins.push(
    new HtmlWebpackPlugin({
      template: `contribs/gmf/examples/${name}.html`,
      chunksSortMode: 'manual',
      filename: `${exampleFilenamePrefix}${name}.html`,
      chunks: ['commons', name],
    })
  );
}

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
      path: path.resolve(__dirname, '../.build/examples-hosted/contribs/gmf'),
    },
  });
}
