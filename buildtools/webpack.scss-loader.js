// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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

const entries = {};

const loaderUtils = require('loader-utils');
const path = require('path');

/**
 * @param transformers
 */
function createTransformersMap(transformers) {
  if (!transformers) {
    return {};
  }

  // return map of extension strings to transformer functions
  return transformers.reduce((extensionMap, transformer) => {
    transformer.extensions.forEach((ext) => {
      extensionMap[ext] = transformer.transform;
    });
    return extensionMap;
  }, {});
}

/**
 * @param ctx
 */
function getLoaderConfig(ctx) {
  const options = loaderUtils.getOptions(ctx) || {};
  const includePaths = options.includePaths || [];
  const basedir = ctx.rootContext || options.context || ctx.options.context || process.cwd();
  const transformers = createTransformersMap(options.transformers);

  // convert relative to absolute
  for (let i = 0; i < includePaths.length; i++) {
    if (!path.isAbsolute(includePaths[i])) {
      includePaths[i] = path.join(basedir, includePaths[i]);
    }
  }

  return {
    basedir: basedir,
    includePaths: includePaths,
    transformers: transformers,
    baseEntryDir: path.dirname(ctx.resourcePath),
    root: options.root,
    data: options.data,
  };
}

module.exports = function (content) {
  entries[this.resourcePath] = {
    'content': content,
    'options': getLoaderConfig(this),
    'ctx': this,
  };
  this.dependency(this.resourcePath);
  return '';
};

module.exports.entries = entries;
