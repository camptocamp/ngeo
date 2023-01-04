'use strict';
const fs = require('fs');
const options = require('commander');
const Compiler = require('angular-gettext-tools').Compiler;

function main(inputs) {
  const compiler = new Compiler({format: 'json'});

  const promises = [];
  inputs.forEach((input) => {
    promises.push(
      new Promise((resolve) => {
        fs.readFile(input, 'utf-8', (error, content) => {
          resolve(error ? undefined : content);
        });
      })
    );
  });

  Promise.all(promises).then((contents) => {
    contents = contents.filter((content) => content !== undefined);
    process.stdout.write(compiler.convertPo(contents));
  });
}

// If running this module directly then call the main function.
if (require.main === module) {
  options.parse(process.argv);
  main(options.args);
}

module.exports = main;
