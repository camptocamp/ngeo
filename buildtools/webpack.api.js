const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const dest = path.resolve(__dirname, '../api/dist/');

module.exports = (env, argv) => {
  const library = argv.library ? argv.library : 'demo';
  return {
    entry: './api/index.js',
    output: {
      filename: 'api.js',
      path: dest,
      libraryTarget: 'umd',
      globalObject: 'this',
      libraryExport: 'default',
      library: library
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: './api/src/api.css',
        to: dest
      }])
    ]
  };
};
