const {merge} = require('webpack-merge');

module.exports = (env, args) => {
  const nodeEnv = args.mode || 'production';
  process.env['NODE_ENV'] = nodeEnv;

  let config = require('./buildtools/webpack.commons')();

  switch (nodeEnv) {
    case 'development':
      config = merge(config, require('./buildtools/webpack.dev')());
      break;
    case 'production':
      config = merge(config, require('./buildtools/webpack.prod')());
      break;
    default:
      console.log(`The 'NODE_ENV' environment variable is set to an invalid value: ${process.env.NODE_ENV}.`);
      process.exit(2);
  }

  switch (process.env.TARGET) {
    case 'ngeo-examples':
      config = merge(config, require('./buildtools/webpack.ngeoexamples'));
      break;
    case 'gmf-examples':
      config = merge(config, require('./buildtools/webpack.gmfexamples'));
      break;
    case 'gmf-apps':
      config = merge(config, require('./buildtools/webpack.gmfapps'));
      break;
    default:
      console.log(`The 'TARGET' environment variable is set to an invalid value: ${process.env.TARGET}.`);
      process.exit(2);
  }

  return config;
};
