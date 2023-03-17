const path = require('path');
const webpack = require('webpack');
const SassPlugin = require('./webpack.plugin.js');

const devMode = process.env.NODE_ENV !== 'production';

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
        'browsers': ['last 2 versions', 'Firefox ESR', 'ie 11'],
      },
      'modules': false,
      'loose': true,
    },
  ],
];

const angularRule = {
  test: require.resolve('angular'),
  use: {
    loader: 'expose-loader',
    options: 'angular',
  },
};

// Expose corejs-typeahead as window.Bloodhound
const typeaheadRule = {
  test: require.resolve('corejs-typeahead'),
  use: {
    loader: 'expose-loader',
    options: 'Bloodhound',
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
  use: 'ejs-loader',
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

const config = function (hardSourceConfig, babelLoaderCacheDirectory) {
  const ngeoRule = {
    test: /\/ngeo\/(?!node_modules\/).*\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        comments: false,
        cacheDirectory: babelLoaderCacheDirectory,
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
        cacheDirectory: babelLoaderCacheDirectory,
        presets: babelPresets,
        plugins: [
          require.resolve('@babel/plugin-syntax-object-rest-spread'),
          require.resolve('@babel/plugin-transform-spread'),
        ],
      },
    },
  };

  return {
    context: path.resolve(__dirname, '../'),
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, '../dist/'),
    },
    module: {
      rules: [angularRule, typeaheadRule, cssRule, sassRule, htmlRule, ngeoRule, otherRule],
    },
    plugins: [
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
              [
                '/apps/desktop/sass/vars_desktop.scss',
                '/apps/desktop_alt/sass/vars_desktop_alt.scss',
                '/apps/iframe_api/sass/vars_iframe_api.scss',
                '/apps/mobile/sass/vars_mobile.scss',
                '/apps/mobile_alt/sass/vars_mobile_alt.scss',
                '/apps/oeedit/sass/vars_oeedit.scss',
                '/apps/oeview/sass/vars_oeview.scss',
                '/apps/sass/var',
                '/controllers/',
                '/vars.scss',
                '/vars_only.scss',
                '/common_dependencies.scss',
              ],
              ['/apps/']
            )
          );
          //console.log(files);
          return files;
        },
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /node_modules\/moment\/src\/lib\/locale$/),
    ],
    resolve: {
      modules: ['../node_modules', '../node_modules/d3/node_modules'],
      mainFields: ['geoblocks_src', 'module', 'jsnext:main', 'main'],
      alias: {
        'ngeo/test': path.resolve(__dirname, '../test/spec'),
        'gmf/test': path.resolve(__dirname, '../contribs/gmf/test/spec'),
        'ngeo': path.resolve(__dirname, '../src'),
        'gmf': path.resolve(__dirname, '../contribs/gmf/src'),
        'jsts': 'jsts/org/locationtech/jts',
        'olcs': 'ol-cesium/src/olcs',
        'jquery-ui/datepicker': 'jquery-ui/ui/widgets/datepicker', // For angular-ui-date
        'proj4': 'proj4/lib',
      },
    },
    optimization: {
      sideEffects: false,
    },
  };
};

module.exports = {
  config: config,
};
