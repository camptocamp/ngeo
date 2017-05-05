// Karma configuration
// Generated on Wed Jun 18 2014 14:25:40 GMT+0200 (CEST)


var isDebug = process.argv.some(function(argument) {
    return argument === '--debug';
});

module.exports = function(config) {
  var closureLibPath = 'node_modules/@camptocamp/closure-util/.deps/library/**/';
  var olSrcPath = 'node_modules/openlayers/src/';
  var olExtPath = 'node_modules/openlayers/build/ol.ext/';

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      closureLibPath + 'closure/goog/base.js',
      closureLibPath + 'closure/goog/deps.js',
      '.build/ol-deps.js',
      '.build/ngeo-deps.js',
      '.build/gmf-deps.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-float-thead/angular-floatThead.js',
      'node_modules/angular-gettext/dist/angular-gettext.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/angular-touch/angular-touch.js',
      'node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.js',
      'node_modules/angular-ui-date/dist/date.js',
      'node_modules/angular-ui-slider/src/slider.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/floatthead/dist/jquery.floatThead.js',
      'node_modules/proj4/dist/proj4-src.js',
      'node_modules/d3/build/d3.js',
      'node_modules/file-saver/FileSaver.js',
      'node_modules/corejs-typeahead/dist/typeahead.bundle.js',
      'third-party/jquery-ui/jquery-ui.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/spec/beforeeach.js',
      'test/spec/data/*.js',
      'test/spec/**/*.spec.js',
      'contribs/gmf/test/spec/beforeeach.js',
      'contribs/gmf/test/spec/data/*.js',
      'contribs/gmf/test/spec/**/*.spec.js',
      {
        pattern: closureLibPath + 'closure/**/*.js',
        included: false
      },
      {
        pattern: olSrcPath + '**/*.js',
        included: false
      },
      {
        pattern: olExtPath + '**/*.js',
        included: false
      },
      {
        pattern: 'src/**/*.js',
        included: false
      },
      {
        pattern: 'contribs/gmf/src/**/*.js',
        included: false
      },
      '.build/gmftemplatecache.js'
    ],


    // list of files to exclude
    exclude: [
      '**/*.swp'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': isDebug ? [] : ['coverage'],
      'contribs/gmf/src/**/*.js': isDebug ? [] : ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: isDebug ? ['progress'] : ['progress', 'coverage'],


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

    customLaunchers: {
      optchrome: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    coverageReporter: {
      includeAllSources: true,
      dir : '.build/coverage/',
      reporters: [
        {type: 'lcov', subdir: './'},
        {type: 'text-summary', subdir: './', file: 'coverage.txt'}
      ]
    }
  });
};
