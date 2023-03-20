const path = require('path');
const ls = require('./ls.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [];
const entry = {};

const exampleFilenamePrefix = process.env.DEV_SERVER ? 'examples/' : '';

for (const filename of ls('examples/*.html')) {
  const name = filename.name;
  entry[name] = [
    './examples/common_dependencies.js', // Should be first
    'ngeo/mainmodule.js', // To have a big commons part
    `./examples/${name}.js`,
  ];

  plugins.push(
    new HtmlWebpackPlugin({
      template: `examples/${name}.html`,
      chunksSortMode: 'manual',
      filename: `${exampleFilenamePrefix}${name}.html`,
      chunks: ['commons', name],
    })
  );
}

// move data folder
plugins.push(
  new CopyWebpackPlugin({
    patterns: [
      {
        from: 'examples/data/*',
        to: 'data',
        flatten: true,
      },
    ],
  })
);

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
      path: path.resolve(__dirname, '../.build/examples-hosted/'),
    },
  });
}
