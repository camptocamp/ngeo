var path = require('path');
var url = require('url');

var closure = require('openlayers/node_modules/closure-util');
var nomnom = require('nomnom');

var log = closure.log;

var options = nomnom.options({
  port: {
    abbr: 'p',
    'default': 3000,
    help: 'Port for incoming connections',
    metavar: 'PORT'
  },
  loglevel: {
    abbr: 'l',
    choices: ['silly', 'verbose', 'info', 'warn', 'error'],
    'default': 'info',
    help: 'Log level',
    metavar: 'LEVEL'
  }
}).parse();


/** @type {string} */
log.level = options.loglevel;

log.info('ngeo', 'Parsing dependencies ...');
var manager = new closure.Manager({
  closure: true, // use the bundled Closure Library
  lib: [
    'src/**/*.js',
    "externs/*.js",
    'node_modules/openlayers/src/**/*.js',
    'node_modules/openlayers/build/ol.ext/*.js'
  ],
  main: 'examples/*.js'
});
manager.on('error', function(e) {
  log.error('ngeo', e.message);
});
manager.on('ready', function() {
  var server = new closure.Server({
    manager: manager
  });
  server.listen(options.port, function() {
    log.info('ngeo', 'Listening on http://localhost:' +
        options.port + '/ (Ctrl+C to stop)');
  });
  server.on('error', function(err) {
    log.error('ngeo', 'Server failed to start: ' + err.message);
    process.exit(1);
  });
});
