"use strict";
/**
 * This task builds OpenLayers with the Closure Compiler.
 */
let path = require('path');

let async = require('async');
let closure = require('@camptocamp/closure-util');
let fs = require('fs-extra');
let nomnom = require('nomnom');
let temp = require('temp').track();

let generateExports = require('./generate-exports');

let log = closure.log;
let root = path.join(__dirname, '..');


/**
 * Assert that a provided config object is valid.
 * @param {Object} config Build configuration object.
 * @param {function(Error)} callback Called with an error if config is invalid.
 */
function assertValidConfig(config, callback) {
  process.nextTick(function() {
    if (!Array.isArray(config.exports)) {
      callback(new Error('Config missing "exports" array'));
      return;
    }
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
    let config;
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
 * Write the exports code to a temporary file.
 * @param {string} exports Exports code.
 * @param {function(Error, string)} callback Called with the path to the temp
 *     file (or any error).
 */
function writeExports(exports, callback) {
  temp.open({prefix: 'exports', suffix: '.js'}, function(err, info) {
    if (err) {
      callback(err);
      return;
    }
    log.verbose('build', 'Writing exports: ' + info.path);
    fs.writeFile(info.path, exports, function(err) {
      if (err) {
        callback(err);
        return;
      }
      fs.close(info.fd, function(err) {
        if (err) {
          callback(err);
          return;
        }
        callback(null, info.path);
      });
    });
  });
}


/**
 * Get the list of sources sorted in dependency order.
 * @param {Object} config Build configuration object.
 * @param {string} exports Exports code (with goog.exportSymbol calls).
 * @param {function(Error, Array.<string>)} callback Called with a list of paths
 *     or any error.
 */
function getDependencies(config, exports, callback) {
  writeExports(exports, function(err, exportsPath) {
    if (err) {
      callback(err);
      return;
    }
    log.info('ol', 'Parsing dependencies');
    let options;
    if (config.src) {
      options = {
        lib: config.src,
        cwd: config.cwd
      };
    } else {
      options = {
        lib: ['src/**/*.js'],
        cwd: root
      };
    }
    closure.getDependencies(options, function(err, paths) {
      if (err) {
        callback(err);
        return;
      }
      paths.push(exportsPath);
      callback(null, paths);
    });
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
      let msg = 'Trouble concatenating sources.  ' + err.message;
      callback(new Error(msg));
    } else {
      let preamble = 'var CLOSURE_NO_DEPS = true;\n';
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
  let options = {
    compile: config.compile,
    cwd: config.cwd || root,
    jvm: config.jvm
  };
  if (!options.compile) {
    log.info('ol', 'No compile options found.  Concatenating ' +
        paths.length + ' sources');
    concatenate(paths, callback);
  } else {
    log.info('ol', 'Compiling ' + paths.length + ' sources');
    paths = paths.concat(options.compile.js || []);
    options.compile.js = paths;
    closure.compile(options, callback);
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
    generateExports.bind(null, config),
    getDependencies.bind(null, config),
    build.bind(null, config)
  ], callback);
}


/**
 * If running this module directly, read the config file and call the main
 * function.
 */
if (require.main === module) {
  let options = nomnom.options({
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
    fs.outputFile.bind(fs, options.output)
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
