'use strict';

const sassLoader = require('./webpack.scss-loader.js');
const nodeSass = require('node-sass');
const path = require('path');
const fs = require('fs-extra');
const co = require('co');
const replaceAsync = require('fast-sass-loader/lib/replace');
const utils = require('fast-sass-loader/lib/utils');
const loaderUtils = require('loader-utils');
const assert = require('assert');
const fileLoader = require('file-loader');


const BOM_HEADER = '\uFEFF';
const EXT_PRECEDENCE = ['.scss', '.sass', '.css'];
const MATCH_URL_ALL = /url\(\s*(['"]?)([^ '"()]+)(\1)\s*\)/g;
const MATCH_IMPORTS = /@import\s+(['"])([^,;'"]+)(\1)(\s*,\s*(['"])([^,;'"]+)(\1))*\s*;/g;
const MATCH_FILES = /(['"])([^,;'"]+)(\1)/g;

function getImportsToResolve(original, includePaths, transformers) {
  const extname = path.extname(original);
  let basename = path.basename(original, extname);
  const dirname = path.dirname(original);

  const imports = [];
  let names = [basename];
  let exts = [extname];
  const extensionPrecedence = [].concat(EXT_PRECEDENCE, Object.keys(transformers));

  if (!extname) {
    exts = extensionPrecedence;
  }
  if (extname && extensionPrecedence.indexOf(extname) === -1) {
    basename = path.basename(original);
    names = [basename];
    exts = extensionPrecedence;
  }
  if (basename[0] !== '_') {
    names.push(`_${basename}`);
  }

  for (let i = 0; i < names.length; i++) {
    for (let j = 0; j < exts.length; j++) {
      // search relative to original file
      imports.push(path.join(dirname, names[i] + exts[j]));

      // search in includePaths
      for (const includePath of includePaths) {
        imports.push(path.join(includePath, dirname, names[i] + exts[j]));
      }
    }
  }

  return imports;
}


const cache = [];

function * mergeSources(opts, entry, resolve, level) {
  level = level || 0;

  const includePaths = opts.includePaths;
  const transformers = opts.transformers;
  let content = false;

  if (typeof entry === 'object') {
    content = entry.content;
    entry = entry.file;
  } else {
    content = yield fs.readFile(entry, 'utf8');

    // fix BOM issue (only on windows)
    if (content.startsWith(BOM_HEADER)) {
      content = content.substring(BOM_HEADER.length);
    }
  }

  const ext = path.extname(entry);

  if (transformers[ext]) {
    content = transformers[ext](content);
  }

  if (opts.data) {
    content = `${opts.data}\n${content}`;
  }

  const entryDir = path.dirname(entry);

  // replace url(...)
  content = content.replace(MATCH_URL_ALL, (total, left, file, right) => {
    if (loaderUtils.isUrlRequest(file)) {
      // handle url(<loader>!<file>)
      const pos = file.lastIndexOf('!');
      if (pos >= 0) {
        left += file.substring(0, pos + 1);
        file = file.substring(pos + 1);
      }

      // test again
      if (loaderUtils.isUrlRequest(file)) {
        const absoluteFile = path.normalize(path.resolve(entryDir, file));
        let relativeFile = path.relative(opts.baseEntryDir, absoluteFile).replace(/\\/g, '/'); // fix for windows path

        if (relativeFile[0] !== '.') {
          relativeFile = `./${relativeFile}`;
        }

        return `url(${left}${relativeFile}${right})`;
      } else {
        return total;
      }
    } else {
      return total;
    }
  });

  // find comments should after content.replace(...), otherwise the comments offset will be incorrect
  const commentRanges = utils.findComments(content);

  // replace @import "..."
  function * importReplacer(total) {
    // if current import is in comments, then skip it
    const range = this;
    const finded = commentRanges.find((commentRange) => {
      if (range.start >= commentRange[0] && range.end <= commentRange[1]) {
        return true;
      }
    });

    if (finded) {
      return total;
    }

    const contents = [];
    let matched;

    // must reset lastIndex
    MATCH_FILES.lastIndex = 0;

    while (matched = MATCH_FILES.exec(total)) { // eslint-disable-line
      const originalImport = matched[2].trim();
      if (!originalImport) {
        const err = new Error(`import file cannot be empty: "${total}" @${entry}`);

        err.file = entry;

        throw err;
      }

      const imports = getImportsToResolve(originalImport, includePaths, transformers);
      let resolvedImport;

      for (let i = 0; i < imports.length; i++) {
        // if imports[i] is absolute path, then use it directly
        if (path.isAbsolute(imports[i]) && fs.existsSync(imports[i])) {
          resolvedImport = imports[i];
        } else {
          try {
            const reqFile = loaderUtils.urlToRequest(imports[i], opts.root);

            resolvedImport = yield resolve(entryDir, reqFile);
            break;
          } catch (err) {
            // skip
          }
        }
      }

      if (!resolvedImport) {
        const err = new Error(`import file cannot be resolved: "${total}" @${entry}`);

        err.file = entry;

        throw err;
      }

      resolvedImport = path.normalize(resolvedImport);

      if (cache.indexOf(resolvedImport) < 0) {
        cache.push(resolvedImport);

        contents.push(yield mergeSources(opts, resolvedImport, resolve, level + 1));
      }
    }

    return contents.join('\n');
  }

  return yield replaceAsync(content, MATCH_IMPORTS, co.wrap(importReplacer));
}
function resolver(ctx) {
  return function(dir, importFile) {
    return new Promise((resolve, reject) => {
      ctx.resolve(dir, importFile, (err, resolvedFile) => {
        if (err) {
          reject(err);
        } else {
          resolve(resolvedFile);
        }
      });
    });
  };
}
class SassPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const options = this.options;
    compiler.plugin('emit', (compilation, callback) => {
      const promise = new Promise((resolve, reject) => {
        const contents = [];
        const browse = function(position) {
          if (position < sassLoader.entries.length) {
            const entry = sassLoader.entries[position];

            const merged = mergeSources(entry.options, {
              file: entry.entry,
              content: entry.content
            }, resolver(entry.ctx));
            const merged2 = [];
            for (const content of merged) {
              merged2.push(content);
            }
            assert.strictEqual(merged2.length, 1);
            merged2[0].then((content) => {
              contents.push(content);
              position++;
              browse(position);
            }, () => {
              reject([position, entry.entry]);
            });
          } else {
            resolve(contents);
          }
        };
        browse(0);
      });

      promise.then((contents) => {
        try {
          const result = nodeSass.renderSync(Object.assign(
            {}, options.sassConfig, {
              data: contents.join('\n'),
              functions: {
                'url($url)': function(url, context) {
                  try {
                    let assetUrl = loaderUtils.urlToRequest(url.getValue());
                    if (assetUrl.startsWith('./data:')) {
                      assetUrl = assetUrl.substring(2);
                    }

                    if (!assetUrl.startsWith('data:')) {
                      const context = {
                        emitFile: function(name, content) {
                          compilation.assets[name] = {
                            source: () => content,
                            size: () => content.length
                          };
                        }
                      };
                      fileLoader.bind(context)(url.getValue());
                    }
                    console.log(`url(${assetUrl})`);
                    return nodeSass.types.String(`url(${assetUrl})`);
                  } catch (e) {
                    console.error(e.stack || e);
                  }
                }
              }
            }
          ));
          const content = result.css;
          const srcmap = result.map;
          compilation.assets[options.filename] = {
            source: () => content,
            size: () => content.length
          };
          if (srcmap) {
            compilation.assets[`${options.filename}.map`] = {
              source: () => srcmap,
              size: () => srcmap.length
            };
          }
          callback();
        } catch (e) {
          console.error(e.stack || e);
          callback();
        }
      }, (position) => {
        callback(`SCSS dependencies error, ${position[0]}, ${position[1]}`);
      });
    });
  }
}

module.exports = SassPlugin;
