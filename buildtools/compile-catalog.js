// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
