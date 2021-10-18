// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
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

const {merge} = require('webpack-merge');

module.exports = (env, args) => {
  const nodeEnv = args.mode || 'production';
  process.env['NODE_ENV'] = nodeEnv;

  let config = {};

  switch (process.env.TARGET) {
    case 'lib':
      config = require('./buildtools/webpack.commons')({'nodll': true});
      break;
    default:
      config = require('./buildtools/webpack.commons')();
  }

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
    case 'lib':
      config = merge(config, require('./buildtools/webpack.lib'));
      break;
    default:
      console.log(`The 'TARGET' environment variable is set to an invalid value: ${process.env.TARGET}.`);
      process.exit(2);
  }

  return config;
};
