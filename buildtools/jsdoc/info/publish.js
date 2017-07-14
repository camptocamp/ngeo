"use strict";
/**
 * Generates JSON output based on exportable symbols (those with
 * an api tag) and boolean defines (with a define tag and a default value).
 */
let assert = require('assert');
let fs = require('fs');
let path = require('path');


/**
 * Publish hook for the JSDoc template.  Writes to JSON stdout.
 * @param {function} data The root of the Taffy DB containing doclet records.
 * @param {Object} opts Options.
 */
exports.publish = function(data, opts) {
  let cwd = process.cwd();

  // get all doclets with the "api" property or define (excluding enums,
  // typedefs and events)
  let docs = data(
      [{define: {isObject: true}}, {api: {isString: true}}],
      {isEnum: {'!is': true}},
      {kind: {'!is': 'typedef'}},
      {kind: {'!is': 'event'}}).get();

  // get symbols data, filter out those that are members of private classes
  let symbols = [];
  let defines = [];
  docs.filter(function(doc) {
    let include = true;
    let constructor = doc.memberof;
    if (constructor && constructor.substr(-1) === '_') {
      assert.strictEqual(doc.inherited, true,
          'Unexpected export on private class: ' + doc.longname);
      include = false;
    }
    return include;
  }).forEach(function(doc) {
    if (doc.define) {
      defines.push({
        name: doc.longname,
        description: doc.description,
        path: path.join(doc.meta.path, doc.meta.filename),
        default: doc.define.default
      });
    } else {
      symbols.push({
        name: doc.longname,
        kind: doc.kind,
        description: doc.classdesc || doc.description,
        extends: doc.augments,
        path: path.join(doc.meta.path, doc.meta.filename)
      });
    }
  });

  process.stdout.write(
      JSON.stringify({symbols: symbols, defines: defines}, null, 2));

};
