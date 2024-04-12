// The MIT License (MIT)
//
// Copyright (c) 2015-2024 Camptocamp SA
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

import tinycolor from 'tinycolor2';

/**
 * @param {Object<string, string>} options
 * @returns {Object<string, string>}
 */
export default function (options) {
  /** @type {Object<string, string>} */
  const cssVars = {};
  if (options['brand-primary']) {
    const primary = tinycolor(options['brand-primary']);

    const link = tinycolor({h: primary.toHsl().h, s: 0.25, l: 0.5});
    cssVars['link-color'] = link.toHexString();
    cssVars['link-hover-color'] = link.clone().darken(15).toHexString();

    const border = primary.clone().darken(15);
    cssVars['input-border-focus'] = border.toHexString();
    cssVars['input-border-focus-darken'] = border.clone().darken(15).toHexString();
    cssVars['border-color'] = border.toHexString();
    cssVars['table-border-color'] = border.toHexString();

    cssVars['hover-background-color'] = primary.clone().lighten(15).toHexString();

    const buttonFocus = primary.clone();
    buttonFocus.setAlpha(0.25);
    cssVars['input-btn-focus-color'] = buttonFocus.toRgbString();
  }
  if (options['brand-secondary']) {
    const secondary = tinycolor(options['brand-secondary']);

    cssVars['brand-secondary-dark'] = secondary.clone().darken(15).toHexString();
  }
  Object.assign(cssVars, options);

  return cssVars;
}
