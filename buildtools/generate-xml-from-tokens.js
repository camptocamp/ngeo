// Initially get from https://github.com/tildeio/simple-html-tokenizer/blob/v0.1.1/lib/simple-html-tokenizer/generator.js

const escape = (function () {
  const test = /[&<>"'`]/;
  const replace = /[&<>"'`]/g;
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
  };
  function escapeChar(char) {
    return map[char];
  }
  return function escape(string) {
    if (!test.test(string)) {
      return string;
    }
    return string.replace(replace, escapeChar);
  };
})();

function Generator() {
  this.escape = escape;
}

Generator.prototype = {
  generate: function (tokens) {
    let buffer = '';
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      buffer += this[token.type](token);
    }
    return buffer;
  },

  escape: function (text) {
    const unsafeCharsMap = this.unsafeCharsMap;
    return text.replace(this.unsafeChars, function (char) {
      return unsafeCharsMap[char] || char;
    });
  },

  StartTag: function (token) {
    let out = '<';
    out += token.tagName;

    if (token.attributes.length) {
      out += ' ' + this.Attributes(token.attributes);
    }

    out += token.selfClosing ? '/>' : '>';

    return out;
  },

  EndTag: function (token) {
    return '</' + token.tagName + '>';
  },

  Chars: function (token) {
    return this.escape(token.chars);
  },

  Comment: function (token) {
    return '<!--' + token.chars + '-->';
  },

  Attributes: function (attributes) {
    const out = [];

    for (let i = 0, l = attributes.length; i < l; i++) {
      const attribute = attributes[i];

      out.push(this.Attribute(attribute[0], attribute[1]));
    }

    return out.join(' ');
  },

  Attribute: function (name, value) {
    let attrString = name;

    if (value) {
      value = this.escape(value);
      attrString += '="' + value + '"';
    }

    return attrString;
  },
};

module.exports = function (tokens) {
  const generator = new Generator();
  return generator.generate(tokens);
};
