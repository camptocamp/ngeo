const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    vendor: [path.resolve(__dirname, '../deps.js')],
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].js',
    library: '[name]_[hash]',
  },
  module: {
    rules: [
      {
        test: /.*\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            comments: false,
            presets: [[
              require.resolve('@babel/preset-env'),
              {
                targets: {
                  browsers: ['last 2 versions', 'Firefox ESR', 'ie 11'],
                },
                modules: false,
                loose: true,
              }
            ]],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dist/vendor-manifest.json'),
      name: '[name]_[hash]',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new webpack.ProvidePlugin({
      // Make sure that Angular finds jQuery and does not fall back to jqLite
      // See https://github.com/webpack/webpack/issues/582
      'window.jQuery': 'jquery',
      // For Bootstrap
      'jQuery': 'jquery',
      // For own scripts
      $: 'jquery',
    }),
  ],
  resolve: {
    alias: {
      'jquery-ui/datepicker': 'jquery-ui/ui/widgets/datepicker', // For angular-ui-date
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
      }),
    ],
    sideEffects: false,
  },
};
