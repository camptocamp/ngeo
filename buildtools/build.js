var fs = require('fs');
var path = require('path');

var async = require('async');
var closure = require('closure-util');
var fse = require('fs-extra');
var nomnom = require('nomnom');
var temp = require('temp').track();

var log = closure.log;


/**
 * Assert that a provided config object is valid.
 * @param {Object} config Build configuration object.
 * @param {function(Error)} callback Called with an error if config is invalid.
 */
function assertValidConfig(config, callback) {
  process.nextTick(function() {
    if (config.namespace && typeof config.namespace !== 'string') {
      callback(new Error('Config "namespace" must be a string'));
      return;
    }
    if (config.compile && typeof config.compile !== 'object') {
      callback(new Error('Config "compile" must be an object'));
      return;
    }
    if (config.jvm && !Array.isArray(config.jvm)) {
      callback(new Error('Config "jvm" must be an array'));
      return;
    }
    if (config.src && !Array.isArray(config.src)) {
      callback(new Error('Config "src" must be an array'));
      return;
    }
    callback(null);
  });
}


/**
 * Read the build configuration file.
 * @param {string} configPath Path to config file.
 * @param {function(Error, Object)} callback Callback.
 */
function readConfig(configPath, callback) {
  fs.readFile(configPath, function(err, data) {
    if (err) {
      if (err.code === 'ENOENT') {
        err = new Error('Unable to find config file: ' + configPath);
      }
      callback(err);
      return;
    }
    var config;
    try {
      config = JSON.parse(String(data));
    } catch (err2) {
      callback(new Error('Trouble parsing config as JSON: ' + err2.message));
      return;
    }
    callback(null, config);
  });
}


/**
 * Get the list of sources sorted in dependency order.
 * @param {Array.<string>} src List of paths or patterns to source files.  By
 *     default, all .js files in the src directory are included.
 * @param {string} ignoreRequires Ignore requires pattern.  Will be used in
 *     a RegExp object.
 * @param {function(Error, Array.<string>)} callback Called with a list of paths
 *     or any error.
 */
function getDependencies(src, ignoreRequires, callback) {
  log.info('ol', 'Parsing dependencies');
  var options = {lib: src, ignoreRequires: ignoreRequires};
  closure.getDependencies(options, function(err, paths) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, paths);
  });
}


/**
 * Concatenate all sources.
 * @param {Array.<string>} paths List of paths to source files.
 * @param {function(Error, string)} callback Called with the concatenated
 *     output or any error.
 */
function concatenate(paths, callback) {
  async.map(paths, fs.readFile, function(err, results) {
    if (err) {
      var msg = 'Trouble concatenating sources.  ' + err.message;
      callback(new Error(msg));
    } else {
      var preamble = 'var CLOSURE_NO_DEPS = true;\n';
      callback(null, preamble + results.join('\n'));
    }
  });
}


/**
 * Run the compiler.
 * @param {Object} config Build configuration object.
 * @param {Array.<string>} paths List of paths to source files.
 * @param {function(Error, string)} callback Called with the compiled output or
 *     any error.
 */
function build(config, paths, callback) {
  var options = config.compile;
  if (!options) {
    log.info('ol', 'No compile options found.  Concatenating ' +
        paths.length + ' sources');
    concatenate(paths, callback);
  } else {
    log.info('ol', 'Compiling ' + paths.length + ' sources');
    options.js = paths.concat(options.js || []);
    if (config.jvm) {
      closure.compile(options, config.jvm, callback);
    } else {
      closure.compile(options, callback);
    }
  }
}


/**
 * Generate a build of the library.
 * @param {Object} config Build configuration object.  Must have an "exports"
 *     array and a "compile" object with options for the compiler.
 * @param {function(Error, string)} callback Called with the compiled source
 *     or any error.
 */
function main(config, callback) {
  async.waterfall([
    assertValidConfig.bind(null, config),
    getDependencies.bind(null, config.src, config.ignoreRequires),
    build.bind(null, config)
  ], callback);
}


/**
 * If running this module directly, read the config file and call the main
 * function.
 */
if (require.main === module) {
  var options = nomnom.options({
    config: {
      position: 0,
      required: true,
      help: 'Path to JSON config file'
    },
    output: {
      position: 1,
      required: true,
      help: 'Output file path'
    },
    loglevel: {
      abbr: 'l',
      choices: ['silly', 'verbose', 'info', 'warn', 'error'],
      default: 'info',
      help: 'Log level',
      metavar: 'LEVEL'
    }
  }).parse();

  /**
   * Set the log level.
   * @type {string}
   */
  log.level = options.loglevel;

  // read the config, run the main function, and write the output file
  async.waterfall([
    readConfig.bind(null, options.config),
    main,
    fse.outputFile.bind(fse, options.output)
  ], function(err) {
    if (err) {
      log.error(err.message);
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
}


/**
 * Export main function.
 */
module.exports = main;
