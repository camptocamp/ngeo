/**
 * Webpack loader to be used after `svg-inline-loader`.
 *
 * It will:
 *  * Fill the `viewBox` if it's missing (to be able to change the `width` and the `height`).
 *  * Fill the `width` and `height` (required by OpenLayers).
 *  * Allows to change the `width` and `height` (with `width` or `height` arguments).
 *  * Remove the unneeded `x` and `y` property.
 *
 * See also the `svg` example.
 */

const simpleHTMLTokenizer = require('simple-html-tokenizer');
const querystring = require('querystring');
const generate = require('./generate-xml-from-tokens.js');
const parseUnit = require('parse-absolute-css-unit');

module.exports = function (source) {
  this.cacheable(true);
  let tokens = simpleHTMLTokenizer.tokenize(source);

  tokens = tokens.map((tag) => {
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
        const queryString = this.resourceQuery.startsWith('?')
          ? this.resourceQuery.substring(1)
          : this.resourceQuery;
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
};
