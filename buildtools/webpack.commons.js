// The MIT License (MIT)
//
// Copyright (c) 2017-2020 Camptocamp SA
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
const SassPlugin = require('./webpack.plugin.js');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = function (config) {
  config = config || {};

  const dllPlugin = new webpack.DllReferencePlugin(
    Object.assign(
      {
        manifest: path.resolve(__dirname, '../dist/vendor-manifest.json'),
      },
      config.DllReferencePluginOptions || {}
    )
  );

  const providePlugin = new webpack.ProvidePlugin({
    // Make sure that Angular finds jQuery and does not fall back to jqLite
    // See https://github.com/webpack/webpack/issues/582
    'window.jQuery': 'jquery',
    // For Bootstrap
    'jQuery': 'jquery',
    // For own scripts
    $: 'jquery',
  });

  const babelPresets = [
    [
      require.resolve('@babel/preset-env'),
      {
        'targets': {
          // See browser list on: https://browserl.ist/
          'browsers': ['> 0.5% in CH', '> 0.5% in FR', 'Firefox ESR', 'ie 11'],
        },
        'modules': false,
        'loose': true,
      },
    ],
  ];

  // Expose corejs-typeahead as window.Bloodhound
  const typeaheadRule = {
    test: require.resolve('corejs-typeahead'),
    use: {
      loader: 'expose-loader',
      options: {
        exposes: ['Bloodhound'],
      },
    },
  };

  const cssRule = {
    test: /\.css$/,
    use: ['./buildtools/webpack.scss-loader', 'extract-loader', 'css-loader'],
  };

  const sassRule = {
    test: /\.scss$/,
    use: [
      {
        loader: './buildtools/webpack.scss-loader',
      },
    ],
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

  function get_comp(firsts, lasts) {
    return (f1, f2) => {
      for (const pattern of firsts) {
        if (f1.indexOf(pattern) >= 0) {
          return -1;
        }
        if (f2.indexOf(pattern) >= 0) {
          return 1;
        }
      }
      for (const pattern of lasts) {
        if (f1.indexOf(pattern) >= 0) {
          return 1;
        }
        if (f2.indexOf(pattern) >= 0) {
          return -1;
        }
      }
      return 0;
    };
  }

  const ngeoRule = {
    test: /\/ngeo\/(?!node_modules\/).*\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        comments: false,
        presets: babelPresets,
        plugins: [require.resolve('@camptocamp/babel-plugin-angularjs-annotate')],
      },
    },
  };
  const otherRule = {
    test: /\/node_modules\/(?!ngeo\/|angular\/).*\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        comments: false,
        presets: babelPresets,
        plugins: [
          require.resolve('@babel/plugin-syntax-object-rest-spread'),
          require.resolve('@babel/plugin-transform-spread'),
          require.resolve('@babel/plugin-proposal-class-properties'),
        ],
      },
    },
  };
  const plugins = [
    providePlugin,
    new SassPlugin({
      filename: devMode ? '[name].css' : '[name].[hash:6].css',
      assetname: '[name].[hash:6].[ext]',
      //tempfile: '/tmp/t.scss',
      blacklistedChunks: ['commons'],
      filesOrder: (chunk, chunksFiles) => {
        const files = chunksFiles.commons
          ? chunksFiles[chunk.name].concat(chunksFiles.commons)
          : chunksFiles[chunk.name];
        files.sort(
          get_comp(
            config.fist_scss || [
              // ngeo default apps
              '/apps/desktop/sass/vars_desktop.scss',
              '/apps/desktop_alt/sass/vars_desktop_alt.scss',
              '/apps/iframe_api/sass/vars_iframe_api.scss',
              '/apps/mobile/sass/vars_mobile.scss',
              '/apps/mobile_alt/sass/vars_mobile_alt.scss',
              '/apps/oeedit/sass/vars_oeedit.scss',
              // GeoMapFish project sass vars files
              '/apps/sass/vars_',
              '/controllers/vars_',
              // For the examples
              'examples/vars.scss',
              // For the tests
              'sass/vars.scss',
            ],
            config.last_scss || [
              // project and ngeo default apps other sass files
              '/apps/',
              '/controllers/',
            ]
          )
        );
        console.log();
        console.log('SCSS files order:');
        for (const file of files) {
          console.log(file);
        }
        console.log();
        return files;
      },
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /node_modules\/moment\/src\/lib\/locale$/),
  ];
  if (config.nodll != true) {
    plugins.push(dllPlugin);
  }

  return {
    context: path.resolve(__dirname, '../'),
    output: {
      path: path.resolve(__dirname, '../dist/'),
    },
    module: {
      rules: [typeaheadRule, cssRule, sassRule, htmlRule, ngeoRule, otherRule],
    },
    plugins: plugins,
    resolve: {
      modules: ['../node_modules', '../node_modules/d3/node_modules'],
      mainFields: ['geoblocks_src', 'module', 'jsnext:main', 'main'],
      alias: {
        'ngeo/test': path.resolve(__dirname, '../test/spec'),
        'gmf/test': path.resolve(__dirname, '../contribs/gmf/test/spec'),
        'ngeo': path.resolve(__dirname, '../src'),
        'api': path.resolve(__dirname, '../api/src'),
        'lib': path.resolve(__dirname, '../lib'),
        'gmf': path.resolve(__dirname, '../contribs/gmf/src'),
        'jsts': 'jsts/org/locationtech/jts',
        'olcs': 'ol-cesium/src/olcs',
        'jquery-ui/datepicker': 'jquery-ui/ui/widgets/datepicker', // For angular-ui-date
        'proj4': 'proj4/lib',
        '@geoblocks/proj': '@geoblocks/proj/src',
      },
    },
    optimization: {
      sideEffects: false,
    },
  };
};
