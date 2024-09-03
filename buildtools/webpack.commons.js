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
const {PromiseTask} = require('event-hooks-webpack-plugin/lib/tasks');

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

  const babelPresetEnv = [
    require.resolve('@babel/preset-env'),
    {
      targets: config.browsers || require('./webpack.share').browsers,
      debug: true,
      loose: true,
    },
  ];

  // Expose corejs-typeahead as window.Bloodhound
  const typeaheadRule = {
    test: require.resolve('corejs-typeahead'),
    use: {
      loader: 'expose-loader',
      options: {
        exposes: 'Bloodhound',
      },
    },
  };

  const jqueryRule = {
    test: require.resolve('jquery'),
    use: {
      loader: 'expose-loader',
      options: {
        exposes: '$',
      },
    },
  };

  const gmfapiExpose = {
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
  };

  const cssRule = {
    test: /\.css$/,
    use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
  };

  const sassRule = {
    test: /\.s[ac]ss$/i,
    use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}],
  };

  const htmlRule = {
    test: /\.html$/,
    use: {
      loader: 'ejs-loader',
      options: {
        esModule: false,
      },
    },
  };

  // Collect every ts(x) files.
  const tsRule = {
    test: /\.tsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        comments: false,
        assumptions: {
          setPublicClassFields: true,
        },
        presets: [babelPresetEnv],
        plugins: [
          [
            require.resolve('@babel/plugin-transform-typescript'),
            // TODO remove allowDeclareFields with Babel 8
            {allowDeclareFields: true},
          ],
          [require.resolve('@babel/plugin-proposal-decorators'), {decoratorsBeforeExport: true}],
        ],
      },
    },
  };

  const files = {};
  const ngeoRule = {
    // Collect every .js file in ngeo/src/, ngeo/api/ and ngeo/contrib/.
    test: (file) => {
      const result = /\/(ngeo)\/(src|api|contribs)\/.*\.js$/.test(file);
      files[file] = files[file] || {};
      files[file]['ngeo'] = result;
      return result;
    },
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        comments: false,
        presets: [babelPresetEnv],
      },
    },
  };
  const otherRule = {
    // Collect every .js file in the node_modules folder except ones that the folder's name
    // starts with "angular" or "mapillary".
    test: (file) => {
      const js = file.endsWith('.js');
      const nodeModules = file.includes('/node_modules/');
      const ngeo = file.includes('/node_modules/ngeo');
      const angular = file.includes('/node_modules/angular/');
      const mapillary = file.includes('/node_modules/mapillary-js/');
      const result = js && nodeModules && !ngeo && !angular && !mapillary;
      files[file] = files[file] || {};
      files[file]['other'] = result;
      return result;
    },
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        comments: false,
        presets: [babelPresetEnv],
      },
    },
  };

  const plugins = [
    providePlugin,
    new webpack.IgnorePlugin(/^\.\/locale$/, /node_modules\/moment\/src\/lib\/locale$/),
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
      rules: [
        typeaheadRule,
        jqueryRule,
        gmfapiExpose,
        cssRule,
        sassRule,
        htmlRule,
        tsRule,
        ngeoRule,
        otherRule,
      ],
    },
    plugins: plugins,
    resolve: {
      modules: ['../node_modules', '../node_modules/d3/node_modules'],
      extensions: ['.ts', '.tsx', '.js'],
      mainFields: ['geoblocks_src', 'module', 'jsnext:main', 'main'],
      alias: {
        'ngeo/test': path.resolve(__dirname, '../test/spec'),
        'gmf/test': path.resolve(__dirname, '../contribs/gmf/test/spec'),
        ngeo: path.resolve(__dirname, '../src'),
        gmfapi: path.resolve(__dirname, '../srcapi'),
        api: path.resolve(__dirname, '../api/src'),
        lib: path.resolve(__dirname, '../lib'),
        gmf: path.resolve(__dirname, '../src'),
        jsts: 'jsts/org/locationtech/jts',
        olcs: 'ol-cesium/src/olcs',
        'jquery-ui/datepicker': 'jquery-ui/ui/widgets/datepicker', // For angular-ui-date
        'mapillary-js/src/Mapillary': 'mapillary-js/dist/mapillary.js',
        // required to make it working with types
        'typeahead': 'corejs-typeahead',
      },
    },
    optimization: {
      sideEffects: false,
    },
  };
};
