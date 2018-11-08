const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoprefix = require('less-plugin-autoprefix');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'

const themes = {
  'mobile': '"~gmf/controllers/mobile-theme.less"',
  'desktop': '"~gmf/controllers/desktop-theme.less"',
  'desktop_alt': '"' + path.resolve('contribs/gmf/apps/desktop_alt/less/theme.less') + '"',
}

const theme = process.env.THEME


const providePlugin = new webpack.ProvidePlugin({
  // Make sure that Angular finds jQuery and does not fall back to jqLite
  // See https://github.com/webpack/webpack/issues/582
  'window.jQuery': 'jquery',
  // For Bootstrap
  'jQuery': 'jquery',
  // For own scripts
  $: 'jquery',
});

const babelPresets = [['env', {
  'targets': {
    'browsers': ['last 2 versions', 'Firefox ESR', 'ie 11'],
  },
  'modules': false,
  'loose': true,
}]];

const angularRule = {
  test: require.resolve('angular'),
  use: {
    loader: 'expose-loader',
    options: 'angular'
  }
};

// Expose corejs-typeahead as window.Bloodhound
const typeaheadRule = {
  test: require.resolve('corejs-typeahead'),
  use: {
    loader: 'expose-loader',
    options: 'Bloodhound'
  }
};

const cssRule = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    use: 'css-loader'
  })
};

const cssLessLoaderConfigs = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  },
  {
    loader: 'less-loader',
    options: {
      lessPlugins: [
        new LessPluginCleanCSS(),
        new LessPluginAutoprefix()
      ],
      modifyVars: {
        'THEME': themes[theme] ? themes[theme] : theme,
      }
    }
  }
];

const lessRule = {
  test: /\.less$/,
  use: ExtractTextPlugin.extract({
    use: cssLessLoaderConfigs
  })
};

const htmlRule = {
  test: /\.html$/,
  use: [{
    loader: 'html-loader',
    options: {
      minimize: true
    }
  }]
};

const config = function(hardSourceConfig, babelLoaderCacheDirectory) {
  const babelAnnotateUse = {
    loader: 'babel-loader',
    options: {
      comments: false,
      cacheDirectory: babelLoaderCacheDirectory,
      presets: babelPresets,
      plugins: ['@camptocamp/babel-plugin-angularjs-annotate'],
    }
  };

  const ngeoRule = {
    test: /ngeo\/src\/.*\.js$/,
    use: babelAnnotateUse,
  };

  const ngeoExamplesRule = {
    test: /ngeo\/examples\/.*\.js$/,
    use: babelAnnotateUse,
  };

  const gmfAppsRule = {
    test: /ngeo\/contribs\/gmf\/apps\/.*\.js$/,
    use: babelAnnotateUse,
  };

  const gmfRule = {
    test: /ngeo\/contribs\/gmf\/src\/.*\.js$/,
    use: babelAnnotateUse,
  };

  const gmfExamplesRule = {
    test: /ngeo\/contribs\/gmf\/examples\/.*\.js$/,
    use: babelAnnotateUse,
  };

  const olRule = {
    test: /openlayers\/src\/.*\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        comments: false,
        cacheDirectory: babelLoaderCacheDirectory,
        presets: babelPresets,
      }
    }
  };

  const olcsRule = {
    test: /olcs\/.*\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        comments: false,
        cacheDirectory: babelLoaderCacheDirectory,
        presets: babelPresets,
      }
    }
  };

  return {
    context: path.resolve(__dirname, '../'),
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, '../dist/')
    },
    module: {
      rules: [
        olRule,
        olcsRule,
        angularRule,
        typeaheadRule,
        cssRule,
        lessRule,
        htmlRule,
        ngeoRule,
        ngeoExamplesRule,
        gmfAppsRule,
        gmfRule,
        gmfExamplesRule,
      ]
    },
    plugins: [
      providePlugin,
      new ExtractTextPlugin({
          ignoreOrder: true,
          filename: devMode ? '[name].css' : '[name].[chunkhash:6].css'
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /node_modules\/moment\/src\/lib\/locale$/),
      new HardSourceWebpackPlugin(hardSourceConfig || {}),
    ],
    resolve: {
      modules: [
        '../node_modules'
      ],
      mainFields: ['jsnext:main', 'main'],
      alias: {
        'ngeo/test': path.resolve(__dirname, '../test/spec'),
        'gmf/test': path.resolve(__dirname, '../contribs/gmf/test/spec'),
        'ngeo': path.resolve(__dirname, '../src'),
        'gmf': path.resolve(__dirname, '../contribs/gmf/src'),
        'goog/asserts': path.resolve(__dirname, '../src/goog.asserts.js'),
        'goog/asserts.js': path.resolve(__dirname, '../src/goog.asserts.js'),
        'jsts': 'jsts/org/locationtech/jts',
        'ol/ol.css': 'openlayers/css/ol.css',
        'ol': 'openlayers/src/ol',
        'olcs': 'ol-cesium/src/olcs',
        'jquery-ui/datepicker': 'jquery-ui/ui/widgets/datepicker', // For angular-ui-date
        'proj4': 'proj4/lib',
      }
    }
  }
};

module.exports = {
  config: config,
};
