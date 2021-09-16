// The MIT License (MIT)
//
// Copyright (c) 2020-2021 Camptocamp SA
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

// Initially get from https://github.com/awnist/ls

const glob = require('glob');

const path = require('path');

/**
 * @typedef {Object} File
 * @property {string} path
 * @property {string} full
 * @property {string} file
 * @property {string} name
 */

/**
 * @param {string[]|string} paths Path or array of paths to iterate over
 * @returns {File[]} Files found
 */
module.exports = function (paths) {
  if (!Array.isArray(paths)) {
    paths = [paths];
  }
  /** @type {File[]} */
  const results = [];
  let trypath;
  while ((trypath = paths.shift())) {
    glob
      .sync(trypath, {
        nonegate: true,
      })
      .forEach(function (file) {
        results.push({
          path: path.dirname(file),
          full: file,
          file: path.basename(file),
          name: path.basename(file, path.extname(file)),
        });
      });
  }
  return results;
};
