const path = require('path');
const ls = require('ls');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [];
const entry = {};

for (const filename of ls('contribs/gmf/examples/*.html')) {
  const name = filename.name;
  entry[name] = [
    './contribs/gmf/examples/common_dependencies.js', // Should be first
    'gmf/mainmodule.js', // To have a big commons part
    `./contribs/gmf/examples/${name}.js`
  ];
  plugins.push(
    new HtmlWebpackPlugin({
      template: `contribs/gmf/examples/${name}.html`,
      chunksSortMode: 'manual',
      filename: name + '.html',
      chunks: ['commons', name],
    }),
  );
}

module.exports = {
  output: {
    path: path.resolve(__dirname, '../.build/examples-hosted/contribs/gmf'),
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
