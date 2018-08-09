"use strict";
let async = require('async');
let fs = require('fs');
let path = require('path');
let options = require('commander');
let Extractor = require('angular-gettext-tools').Extractor;

function main(inputs) {
  let extractor = new Extractor();

  async.eachSeries(inputs,
    function(input, cb) {
      fs.readFile(input, {encoding: 'utf-8'}, function(err, data) {
        if (!err) {
          extractor.parse(input, data);
        }
        cb(err);
      });
    },
    function(err) {
      if (err) {
        throw new Error(err);
      }
      process.stdout.write(extractor.toString());
    }
  );
}

// If running this module directly then call the main function.
if (require.main === module) {
  options.parse(process.argv);
  main(options.args);
}

module.exports = main;
