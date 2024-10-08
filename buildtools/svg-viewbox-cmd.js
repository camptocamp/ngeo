// The MIT License (MIT)
//
// Copyright (c) 2018-2024 Camptocamp SA
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

/**
 * It will:
 *  - Fill the `viewBox` if it's missing (to be able to change the `width` and the `height`).
 *  - Fill the `width` and `height` (required by OpenLayers).
 *  - Allows to change the `width` and `height` (with `width` or `height` arguments).
 *  - Remove the unneeded `x` and `y` property.
 */

const simpleHTMLTokenizer = require('simple-html-tokenizer');
const querystring = require('querystring');
const generate = require('./generate-xml-from-tokens.js');
const parseUnit = require('parse-absolute-css-unit');
const {program} = require('commander');
const fs = require('fs');

function process(source, resourceQuery) {
  let tokens = simpleHTMLTokenizer.tokenize(source);

  tokens = tokens.map((tag) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (tag.type === 'StartTag' && tag.tagName === 'svg') {
      let width = undefined;
      let height = undefined;
      let viewBox = undefined;
      for (const attribute of tag.attributes) {
        if (attribute[0] === 'width') {
          try {
            width = parseUnit(attribute[1]);
          } catch (e) {
            console.warn('Unable to read width: ' + attribute[1]);
          }
        }
        if (attribute[0] === 'height') {
          try {
            height = parseUnit(attribute[1]);
          } catch (e) {
            console.warn('Unable to read height: ' + attribute[1]);
          }
        }
        if (attribute[0] === 'viewBox') {
          viewBox = attribute[1];
        }
      }
      if (viewBox !== undefined && width === undefined && height === undefined) {
        try {
          const attrs = viewBox.split(' ');
          width = parseFloat(attrs[2]);
          height = parseFloat(attrs[3]);
        } catch (e) {
          console.warn('Unable to read viewBox: ' + viewBox);
        }
      }
      if (width !== undefined && height != undefined) {
        tag.attributes = tag.attributes.filter((attribute) => {
          return (
            attribute[0] !== 'width' &&
            attribute[0] !== 'height' &&
            attribute[0] !== 'x' &&
            attribute[0] !== 'y'
          );
        });
        if (viewBox === undefined) {
          tag.attributes.push(['viewBox', `0 0 ${width} ${height}`, true]);
        }
        const queryString = resourceQuery.startsWith('?') ? resourceQuery.substring(1) : resourceQuery;
        const query = querystring.decode(queryString);
        if (query.width !== undefined) {
          const parsed = query.width.match(/^([0-9]+)([a-z]*)$/);
          tag.attributes.push(['width', query.width, true]);
          tag.attributes.push(['height', `${(height / width) * parseFloat(parsed[1])}${parsed[2]}`, true]);
        } else if (query.height !== undefined) {
          const parsed = query.height.match(/^([0-9]+)([a-z]*)$/);
          tag.attributes.push(['width', `${(width / height) * parseFloat(parsed[1])}${parsed[2]}`, true]);
          tag.attributes.push(['height', query.height, true]);
        } else {
          tag.attributes.push(['width', width, true]);
          tag.attributes.push(['height', height, true]);
        }
      }
    }
    return tag;
  });

  return generate(tokens);
}

function main(args) {
  const uri = args[0];
  const resourceQuery = args[1];
  const source = fs.readFileSync(uri, 'utf-8');
  const result = process(source, resourceQuery);
  fs.writeFileSync(uri, result, 'utf-8');
}

// If running this module directly then call the main function.
if (require.main === module) {
  program.parse(process.argv);
  main(program.args);
}

module.exports = main;
