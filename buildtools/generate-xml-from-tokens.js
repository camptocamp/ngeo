// The MIT License (MIT)
//
// Copyright (c) 2019-2021 Camptocamp SA
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
  /**
   * @param char
   */
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

/**
 *
 */
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
