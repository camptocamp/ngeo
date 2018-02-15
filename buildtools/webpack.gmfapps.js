const path = require('path');
const ls = require('ls');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [];
const entry = {};

for (const filename of ls('contribs/gmf/apps-webpack/*/index.html')) {
  const name = path.basename(filename.path);
  entry[name] = `./${filename.path}/js/Controller.js`;
  plugins.push(
    new HtmlWebpackPlugin({
      template: filename.full,
      chunksSortMode: 'manual',
      filename: name + '.html',
      chunks: ['common', name],
    }),
  );
}
plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'common',
  chunks: Object.keys(entry),
}));

module.exports = {
  output: {
    path: path.resolve(__dirname, '../.build/contribs-gmf-apps'),
  },
  entry: entry,
  plugins: plugins,
};
