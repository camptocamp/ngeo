const path = require('path');
const ls = require('./ls.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [];
const entry = {};

const filenamePrefix = process.env.DEV_SERVER ? 'contribs/gmf/apps/' : '';

for (const filename of ls('contribs/gmf/apps/*/index.html.ejs')) {
  const name = path.basename(filename.path);
  const folder = `contribs/gmf/apps/${name}`;
  entry[name] = `./${folder}/Controller.js`;
  plugins.push(
    new HtmlWebpackPlugin({
      template: `${folder}/index.html.ejs`,
      inject: false,
      chunksSortMode: 'manual',
      filename: `${filenamePrefix}${name}.html`,
      chunks: [name],
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
}
