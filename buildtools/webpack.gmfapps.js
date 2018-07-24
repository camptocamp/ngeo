const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const plugins = [];
const entry = {};

const filenamePrefix = process.env.DEV_SERVER ? 'contribs/gmf/apps/' : '';
const name = process.env.APP;

const folder = `contribs/gmf/apps/${name}`;
entry[name] = `./${folder}/Controller.js`;
plugins.push(
  new HtmlWebpackPlugin({
    template: `${folder}/index.html.ejs`,
    inject: false,
    chunksSortMode: 'manual',
    filename: `${filenamePrefix}${name}.html`,
    chunks: ['commons', name]
  })
);
plugins.push(
  new HtmlWebpackIncludeAssetsPlugin({
    assets: ['all.css'],
    append: true,
  })
);


module.exports = {
  entry: entry,
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'commons',
    }
  },
  plugins: plugins,
};

if (!process.env.DEV_SERVER) {
  Object.assign(module.exports, {
    output: {
      path: path.resolve(__dirname, '../.build/examples-hosted/contribs/gmf/apps'),
    },
  });
}
