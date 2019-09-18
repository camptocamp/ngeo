const webpack = require('webpack');

process.traceDeprecation = true;

const resourcesRule = {
  test: /\.(jpeg|png|ico|cur|eot|ttf|woff|woff2)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]'
    },
  }
};

const svgRule = {
  test: /\.svg$/,
  oneOf: [{
    resourceQuery: /url/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        },
      },
      'svgo-loader',
    ]
  }, {
    resourceQuery: /viewbox/,
    use: [
      {
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false,
        },
      },
      './buildtools/svg-viewbox-loader',
      'svgo-loader',
    ]
  }, {
    use: [
      {
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false,
        },
      },
      'svgo-loader',
    ]
  }]
};

new webpack.LoaderOptionsPlugin({
  debug: false
});


module.exports = function() {
  return {
    mode: 'development',
    devtool: 'inline-cheap-source-map', // 'cheap-eval-source-map',
    output: {
      filename: '[name].js'
    },
    module: {
      rules: [
        resourcesRule,
        svgRule,
      ]
    },
  };
};
