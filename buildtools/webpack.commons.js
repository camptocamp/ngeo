const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoprefix = require('less-plugin-autoprefix');


const providePlugin = new webpack.ProvidePlugin({
  // Make sure that Angular finds jQuery and does not fall back to jqLite
  // See https://github.com/webpack/webpack/issues/582
  'window.jQuery': 'jquery',
  // For Bootstrap
  'jQuery': 'jquery',
  // For own scripts
  $: 'jquery',
});

const babelAnnotateUse = {
  loader: 'babel-loader',
  options: {
    presets: ['es2015'],
    plugins: ['@camptocamp/babel-plugin-angularjs-annotate'],
  }
}

const ngeoRule = {
  test: /ngeo\/src\/.*\.js$/,
  use: babelAnnotateUse,
}

const ngeoExamplesRule = {
  test: /ngeo\/examples\/.*\.js$/,
  use: babelAnnotateUse,
}

const gmfRule = {
  test: /ngeo\/contribs\/gmf\/src\/.*\.js$/,
  use: babelAnnotateUse,
}

const gmfExamplesRule = {
  test: /ngeo\/contribs\/gmf\/examples\/.*\.js$/,
  use: babelAnnotateUse,
}

const olRule = {
  test: /openlayers\/src\/.*\.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      presets: ['es2015'],
    }
  }
};


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

const dateFormatterRule = {
  test: require.resolve('jquery-datetimepicker'),
  use: {
    loader: 'expose-loader',
    options: 'DateFormatter'
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
    options: {importLoaders: 1}
  },
  {
    loader: 'less-loader',
    options: {
      lessPlugins: [
        new LessPluginCleanCSS(),
        new LessPluginAutoprefix()
      ]
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

const iconRule = {
  test: /\.(png|svg)$/,
  use: {
    loader: 'url-loader'
  }
};

const cursorRule = {
  test: /\.cur$/,
  use: {
    loader: 'url-loader'
  }
};

const config = {
  context: path.resolve(__dirname, '../'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist/')
  },
  module: {
    rules: [
      olRule,
      angularRule,
      typeaheadRule,
      dateFormatterRule,
      cssRule,
      lessRule,
      htmlRule,
      iconRule,
      cursorRule,
      ngeoRule,
      ngeoExamplesRule,
      gmfRule,
      gmfExamplesRule,
    ]
  },
  plugins: [
    providePlugin,
    new ExtractTextPlugin('[name].css'),
    new ExtractTextPlugin('[name].less'),
    new webpack.IgnorePlugin(/^\.\/locale$/, /node_modules\/moment\/src\/lib\/locale$/),
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
      // For angular-ui-date
      'jquery-ui/datepicker' : 'jquery-ui/ui/widgets/datepicker',
      'jquery-ui' : 'jquery-ui/ui',
      'proj4': 'proj4/lib',
    }
  }
};

module.exports = {
  config: config,
};
