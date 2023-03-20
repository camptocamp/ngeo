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
