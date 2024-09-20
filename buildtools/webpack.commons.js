// The MIT License (MIT)
//
// Copyright (c) 2017-2024 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = function (config) {
  config = config || {};

  const dllPlugin = new webpack.DllReferencePlugin(
    Object.assign(
      {
        manifest: path.resolve(__dirname, '../dist/vendor-manifest.json'),
      },
      config.DllReferencePluginOptions || {},
    ),
  );

  const providePlugin = new webpack.ProvidePlugin({
    // Make sure that Angular finds jQuery and does not fall back to jqLite
    // See https://github.com/webpack/webpack/issues/582
    'window.jQuery': 'jquery',
    // For Bootstrap
    jQuery: 'jquery',
    // For own scripts
    $: 'jquery',
  });

  const rules = [];

  // Expose corejs-typeahead as window.Bloodhound
  rules.push({
    test: require.resolve('corejs-typeahead'),
    use: {
      loader: 'expose-loader',
      options: {
        exposes: 'Bloodhound',
      },
    },
  });

  rules.push({
    test: require.resolve('jquery'),
    use: {
      loader: 'expose-loader',
      options: {
        exposes: '$',
      },
    },
  });

  rules.push({
    test: path.resolve(__dirname, '../srcapi/index.ts'),
    use: {
      loader: 'expose-loader',
      options: {
        exposes: {
          globalName: 'gmfapi',
          moduleLocalName: 'default',
        },
      },
    },
  });

  rules.push({
    test: /\.css$/,
    use: [{loader: MiniCssExtractPlugin.loader}, {loader: 'css-loader'}],
  });

  rules.push({
    test: /\.s[ac]ss$/i,
    use: [
      {loader: MiniCssExtractPlugin.loader},
      {loader: 'css-loader'},
      {loader: 'sass-loader', options: {warnRuleAsWarning: false}},
    ],
  });

  rules.push({
    test: /\.(jpeg|png|ico|eot|ttf|woff|woff2|svg|json)$/,
    type: 'asset/resource',
  });

  rules.push({
    test: /\.html$/,
    use: {
      loader: 'ejs-loader',
      options: {
        esModule: false,
      },
    },
  });

  if (config.noTs != true) {
    rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
        },
        {
          loader: 'minify-html-literals-loader',
        },
      ],
    });
  }

  rules.push({
    test: /MapillaryService\.js$/,
    use: [
      {
        loader: 'magic-comments-loader',
      },
    ],
  });

  const plugins = [
    providePlugin,
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /node_modules\/moment\/src\/lib\/locale$/,
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:6].css',
    }),
  ];
  if (config.nodll != true) {
    plugins.push(dllPlugin);
  }

  plugins.push(
    new webpack.IgnorePlugin({
      resourceRegExp: /^cross-fetch$/,
      contextRegExp: /i18next-http-backend\/esm$/,
    }),
  );

  return {
    context: path.resolve(__dirname, '../'),
    output: {
      path: path.resolve(__dirname, '../dist/'),
    },
    module: {
      rules: rules,
    },
    plugins: plugins,
    resolve: {
      modules: ['../node_modules', '../node_modules/d3/node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.mjs'],
      alias: {
        'ngeo/test': path.resolve(__dirname, '../test/spec'),
        'gmf/test': path.resolve(__dirname, '../contribs/gmf/test/spec'),
        ngeo: path.resolve(__dirname, '../src'),
        gmfapi: path.resolve(__dirname, '../srcapi'),
        api: path.resolve(__dirname, '../api/src'),
        lib: path.resolve(__dirname, '../lib'),
        gmf: path.resolve(__dirname, '../src'),
        'jquery-ui/datepicker': 'jquery-ui/ui/widgets/datepicker', // For angular-ui-date
      },
    },
    optimization: {
      sideEffects: false,
    },
  };
};
