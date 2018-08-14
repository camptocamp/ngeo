const simpleHTMLTokenizer = require('simple-html-tokenizer');

module.exports = function(source) {
  this.cacheable(true);
  let tokens = simpleHTMLTokenizer.tokenize(source);

  tokens = tokens.map((tag) => {
    let width = undefined;
    let height = undefined;
    if (tag.type === 'StartTag' && tag.tagName === 'svg') {
      for (const attribute of tag.attributes) {
        if (attribute[0] === 'width') {
          width = parseFloat(attribute[1]);
        }
        if (attribute[0] === 'height') {
          height = parseFloat(attribute[1]);
        }
      }
      if (width !== undefined && height != undefined) {
        tag.attributes = tag.attributes.filter((attribute) => {
          return attribute[0] !== 'width' && attribute[0] != 'height'
        })
        tag.attributes.push(['viewBox', `0 0 ${width} ${height}`, true]);
        tag.attributes.push(['height', '1em', true]);
      }
    }
    return tag;
  })

  return simpleHTMLTokenizer.generate(tokens)
};
