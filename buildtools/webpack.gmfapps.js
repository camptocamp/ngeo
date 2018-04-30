const path = require('path');
const ls = require('ls');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [];
const entry = {};

const filenamePrefix = process.env.DEV_SERVER ? 'contribs/gmf/apps/' : '';

for (const filename of ls('contribs/gmf/apps/*/index.html')) {
  const name = path.basename(filename.path);
  entry[name] = `./${filename.path}/Controller.js`;
  plugins.push(
    new HtmlWebpackPlugin({
      template: filename.full,
      chunksSortMode: 'manual',
      filename: filenamePrefix + name + '/index.html',
      chunks: ['commons', name]
    })
  );

  plugins.push(new CopyWebpackPlugin([
      {
        from: filename.path + '/image',
        to: name + '/image',
        flatten: true
      },
    ], {
      debug: 'debug'
    }
  ));
}


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
