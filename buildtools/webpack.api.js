const path = require('path');

module.exports = (env, argv) => {
  const library = argv.library ? argv.library : 'demo';
  return {
    entry: './api/index.js',
    output: {
      filename: 'api.js',
      path: path.resolve(__dirname, 'api/dist/'),
      libraryTarget: 'umd',
      globalObject: 'this',
      libraryExport: 'default',
      library: library
    }
  };
};
