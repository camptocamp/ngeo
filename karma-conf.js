// Karma configuration
// Generated on Wed Jun 18 2014 14:25:40 GMT+0200 (CEST)

module.exports = function(config) {
  var closureLib = 'node_modules/openlayers/node_modules/' +
      'closure-util/.deps/library/**/';
  var ol = 'node_modules/openlayers/src/';

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      closureLib + 'closure/goog/base.js',
      closureLib + 'closure/goog/deps.js',
      '.build/ol-deps.js',
      '.build/ngeo-deps.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/spec/beforeeach.js',
      'test/spec/**/*.spec.js',
      {
        pattern: closureLib + 'closure/**/*.js',
        included: false,
        watched: false,
        served: true
      },
      {
        pattern: ol + '**/*.js',
        included: false,
        watched: false,
        served: true
      },
      {
        pattern: 'src/**/*.js',
        included: false,
        watched: true,
        served: true
       }
    ],


    // list of files to exclude
    exclude: [
      '**/*.swp'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
