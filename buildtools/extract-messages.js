var async = require('async');
var fs = require('fs');
var path = require('path');
var nomnom = require('nomnom');
var Extractor = require('angular-gettext-tools').Extractor;

function main(inputs) {
  var extractor = new Extractor();

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
  var options = nomnom.parse();
  var inputs = options._;
  main(inputs);
}

module.exports = main;
