'use strict';

const entries = {};

const loaderUtils = require('loader-utils');
const path = require('path');

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
