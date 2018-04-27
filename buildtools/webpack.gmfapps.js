const path = require('path');
const ls = require('ls');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [];
const entry = {};

for (const filename of ls('contribs/gmf/apps/*/index.html')) {
  const name = path.basename(filename.path);
  entry[name] = `./${filename.path}/js/Controller.js`;
  plugins.push(
    new HtmlWebpackPlugin({
      template: filename.full,
      chunksSortMode: 'manual',
      filename: name + '.html',
      chunks: ['commons', name],
    }),
  );
}

module.exports = {
  output: {
    path: path.resolve(__dirname, '../.build/contribs-gmf-apps'),
  },
  entry: entry,
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'commons',
    }
  },
  plugins: plugins,
};
