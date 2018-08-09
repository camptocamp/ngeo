"use strict";
let fs = require('fs');
let options = require('commander');
let Compiler = require('angular-gettext-tools').Compiler;

function main(inputs) {
  let compiler = new Compiler({format: 'json'});

  let contents = [];
  inputs.forEach(function(input) {
    // ignore un existing files
    fs.exists(input, function(exists) {
      if (exists) {
        fs.readFile(input, {encoding: 'utf-8'}, function(err, content) {
          if (!err) {
            contents.push(content);
            if (contents.length === inputs.length) {
              process.stdout.write(compiler.convertPo(contents.filter(function (content) {
                return content.length !== 0;
              })));
            }
          }
        });
      }
      else {
        contents.push("")
      }
    });
  });
}

// If running this module directly then call the main function.
if (require.main === module) {
  options.parse(process.argv);
  main(options.args);
}

module.exports = main;
