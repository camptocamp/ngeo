const webpackMerge = require('webpack-merge');
const commons = require('./buildtools/webpack.commons');

let config = commons.config({}, true);

const nodeEnv = process.env['NODE_ENV'] || 'development';
switch (nodeEnv) {
  case 'development':
    config = webpackMerge(config, require('./buildtools/webpack.dev'));
    break;
  case 'production':
    config = webpackMerge(config, require('./buildtools/webpack.prod')(true));
    break;
  default:
    console.log(`The 'NODE_ENV' environment variable is set to an invalid value: ${process.env.NODE_ENV}.` )
    process.exit(2);
}

switch (process.env.TARGET) {
  case 'ngeo-examples':
    config = webpackMerge(config, require('./buildtools/webpack.ngeoexamples'));
    break;
  case 'gmf-examples':
    config = webpackMerge(config, require('./buildtools/webpack.gmfexamples'));
    break;
  case 'gmf-apps':
    config = webpackMerge(config, require('./buildtools/webpack.gmfapps'));
    break;
  default:
    console.log(`The 'TARGET' environment variable is set to an invalid value: ${process.env.TARGET}.` )
    process.exit(2);
}

module.exports = config
