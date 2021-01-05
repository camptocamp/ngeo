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

for (const filename of ls('contribs/gmf/apps/*/index.html.ejs')) {
  const name = path.basename(filename.path);
  const folder = `contribs/gmf/apps/${name}`;
  entry[name] = `./${folder}/Controller.js`;
  plugins.push(
    new HtmlWebpackPlugin({
      template: `${folder}/index.html.ejs`,
      inject: false,
      chunksSortMode: 'manual',
      filename: `${name}.html`,
      chunks: [name],
      vars: {
        version: 'dev',
      },
    })
  );
}

module.exports = {
  entry: entry,
  plugins: plugins,
};

if (!process.env.DEV_SERVER) {
  Object.assign(module.exports, {
    output: {
      path: path.resolve(__dirname, '../.build/examples-hosted/contribs/gmf/apps'),
    },
  });
} else {
  Object.assign(module.exports, {
    output: {
      publicPath: '/contribs/gmf/apps/',
    },
  });
}
