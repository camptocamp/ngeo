var async = require('async');
var fs = require('fs');
var path = require('path');
var nomnom = require('nomnom');
var Compiler = require('angular-gettext-tools').Compiler;

function main(inputs) {
  var compiler = new Compiler({format: 'json'});

  var contents = [];
  async.eachSeries(inputs, function(input, cb) {
    fs.exists(input, function(exists) {
      if (exists) {
        fs.stat(input, function(error, stats) {
          if (stats.size != 0) {
            fs.readFile(input, {encoding: 'utf-8'}, function(err, content) {
              if (!err) {
                contents.push(content);
              }
              cb(err);
            });
          } else {
            process.stdout.write("{}");
          }
        });
      } else {
        process.stdout.write("{}");
      }
    });
  }, function(err) {
    if (!err) {
      var output = compiler.convertPo(contents);
      process.stdout.write(output);
    }
  });
}

// If running this module directly then call the main function.
if (require.main === module) {
  var options = nomnom.parse();
  var inputs = options._;
  main(inputs);
}

module.exports = main;
