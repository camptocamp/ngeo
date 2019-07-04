const simpleHTMLTokenizer = require('simple-html-tokenizer');
const generate = require('./generate-xml-from-tokens.js');

module.exports = function(source) {
  this.cacheable(true);
  let tokens = simpleHTMLTokenizer.tokenize(source);

  tokens = tokens.map((tag) => {
    if (tag.type === 'StartTag' && tag.tagName === 'svg') {
      let width = undefined;
      let height = undefined;
      let x = 0;
      let y = 0;
      for (const attribute of tag.attributes) {
        if (attribute[0] === 'width') {
          try {
            width = parseFloat(attribute[1]);
          } catch (e) {
            console.warn('Unable to read width: ' + attribute[1]);
          }
        }
        if (attribute[0] === 'height') {
          try {
            height = parseFloat(attribute[1]);
          } catch (e) {
            console.warn('Unable to read height: ' + attribute[1]);
          }
        }
        if (attribute[0] === 'x') {
          try {
            x = parseFloat(attribute[1]);
          } catch (e) {
            console.warn('Unable to read x: ' + attribute[1]);
          }
        }
        if (attribute[0] === 'y') {
          try {
            y = parseFloat(attribute[1]);
          } catch (e) {
            console.warn('Unable to read y: ' + attribute[1]);
          }
        }
        if (attribute[0] === 'viewBox') {
          try {
            const attrs = attribute[1].split(' ');
            x = parseFloat(attrs[0]);
            y = parseFloat(attrs[1]);
            width = parseFloat(attrs[2]);
            height = parseFloat(attrs[3]);
          } catch (e) {
            console.warn('Unable to read viewbox: ' + attribute[1]);
          }
        }
      }
      if (width !== undefined && height != undefined) {
        tag.attributes = tag.attributes.filter((attribute) => {
          return attribute[0] !== 'width' && attribute[0] != 'height' && attribute[0] != 'viewBox';
        });
        if (x) {
          tag.attributes.push(['x', x, true]);
        }
        if (y) {
          tag.attributes.push(['y', y, true]);
        }
        if (this.resourceQuery.search(/inline/) >= 0) {
          tag.attributes.push(['width', width, true]);
          tag.attributes.push(['height', height, true]);
        } else {
          tag.attributes.push(['viewBox', `0 0 ${width} ${height}`, true]);
          tag.attributes.push(['height', '1em', true]);
          tag.attributes.push(['width', `${width / height}em`, true]);
        }
      }
    }
    return tag;
  });

  return generate(tokens);
};
