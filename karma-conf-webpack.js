const path = require('path');

var isDebug = process.argv.some(function(argument) {
  return argument === '--debug';
});

const webpackMerge = require('webpack-merge');
const commons = require('./buildtools/webpack.commons');
let webpackConfig = commons.config;
webpackConfig = webpackMerge(webpackConfig, require('./buildtools/webpack.dev'));
webpackConfig = webpackMerge(webpackConfig, {
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'istanbul-instrumenter-loader' ,
        options: { esModules: true }
      },
      enforce: 'post',
      exclude: /node_modules|\.spec\.js$/,
    }]
  }
});

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'test/spec/all.js',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/spec/all.js': ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: isDebug ? ['progress', 'coverage-istanbul'] : ['coverage-istanbul'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['optchrome'],
    browserNoActivityTimeout: 20000,

    customLaunchers: {
      optchrome: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // any of these options are valid: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-api/lib/config.js#L33-L39
    coverageIstanbulReporter: {

       // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
      reports: isDebug ? ['lcovonly', 'text-summary', 'html'] : ['lcovonly', 'text-summary'],

       // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      dir: path.resolve(__dirname, '.build/coverage'),

       // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,

      // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
      skipFilesWithNoCoverage: true,

       // enforce percentage thresholds
       // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
      thresholds: {
        emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        global: { // thresholds for all files
          statements: 40,
          lines: 40,
          branches: 25,
          functions: 30,
        }
      }
    }
  });
};
