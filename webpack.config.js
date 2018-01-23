const webpackMerge = require('webpack-merge');
const commons = require('./buildtools/webpack.commons');

let config = commons.config;

switch (process.env.NODE_ENV) {
  case 'dev':
    config = webpackMerge(config, require('./buildtools/webpack.dev'));
    break;
  case 'prod':
    config = webpackMerge(config, require('./buildtools/webpack.prod'));
    break;
  default:
    console.log(`The 'NODE_ENV' environement variable is set to an invalide value: ${process.env.NODE_ENV}.` )
    process.exit(2);
}

switch (process.env.TARGET) {
  case 'ngeo-examples':
    config = webpackMerge(config, require('./buildtools/webpack.ngeoexamples'));
    break;
  case 'gmf-examples':
    config = webpackMerge(config, require('./buildtools/webpack.gmfexamples'));
    break;
  default:
    console.log(`The 'TARGET' environement variable is set to an invalide value: ${process.env.TARGET}.` )
    process.exit(2);
}

module.exports = config
