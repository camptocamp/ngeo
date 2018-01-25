const path = require('path');
const ls = require('ls');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [];
const entry = {};

for (const filename of ls('contribs/gmf/examples/*.html')) {
  const name = filename.name;
  entry[name] = `./contribs/gmf/examples/${name}.js`;
  plugins.push(
    new HtmlWebpackPlugin({
      template: `contribs/gmf/examples/${name}.html`,
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
    path: path.resolve(__dirname, '../.build/examples-hosted/contribs/gmf'),
  },
  entry: entry,
  plugins: plugins,
};
