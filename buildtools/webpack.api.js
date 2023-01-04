const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const dest = path.resolve(__dirname, '../api/dist/');

const babelPresetEnv = [
  '@babel/preset-env',
  {
    targets: {
      browsers: ['last 2 versions', 'Firefox ESR', 'ie 11'],
    },
    modules: false,
    loose: true,
  },
];

module.exports = (env, argv) => {
  const library = argv.library ? argv.library : 'demo';
  return {
    entry: './api/index.js',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              comments: false,
              presets: [babelPresetEnv],
            },
          },
        },
      ],
    },
    output: {
      filename: 'api.js',
      path: dest,
      libraryTarget: 'umd',
      globalObject: 'this',
      libraryExport: 'default',
      library: library,
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          sourceMap: true,
          terserOptions: {
            compress: false,
          },
        }),
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './api/src/api.css',
            to: dest,
          },
        ],
      }),
    ],
  };
};
