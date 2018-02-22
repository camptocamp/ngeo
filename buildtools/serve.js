"use strict";

let path = require('path');
let url = require('url');

let closure = require('@camptocamp/closure-util');
let options = require('commander');
let gaze = require('gaze');
let exec = require('child_process').exec;

let log = closure.log;

options.option('-p, --port [number]', 'Port for incoming connections', parseInt, 3000);
options.option('-l, --loglevel [level]', 'Log level',  /^(silly|verbose|info|warn|error)$/i, 'info');
options.parse(process.argv);

/** @type {string} */
log.level = options.loglevel;

function compileCss() {
  log.info('ngeo', 'Compiling CSS');
  exec('make compile-css', function(error, stdout, stderr) {
    if (error !== null) {
      console.log(error);
    }
    if (stdout) {
      console.error(stdout);
    }
  });

}

compileCss();

log.info('ngeo', 'Parsing dependencies ...');
let manager = new closure.Manager({
  closure: true, // use the bundled Closure Library
  lib: [
    'src/**/*.js',
    'contribs/**/src/**/*.js',
    'externs/*.js',
    'node_modules/openlayers/src/**/*.js',
    'node_modules/ol-cesium/src/**/*.js',
    'node_modules/openlayers/build/ol.ext/*.js'
  ],
  main: ['examples/*.js', 'contribs/**/examples/*.js', 'contribs/**/apps/**/*.js']
});
manager.on('error', function(e) {
  log.error('ngeo', e.message);
});
manager.on('ready', function() {
  let server = new closure.Server({
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

  gaze('**/*.less', function(err, watcher) {
    this.on('all', function(event, filepath) {
      console.log(filepath + ' was ' + event);
      compileCss();
    });
  });
});
