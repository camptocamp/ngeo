// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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

import calculateCssVars from 'gmf/controllers/calculateCssVars.js';

describe('AbstractAppController', () => {
  it('Calculate primary colors', () => {
    expect(
      calculateCssVars({
        'brand-primary': '#9FB6CC',
      })
    ).toEqual({
      'brand-primary': '#9FB6CC',
      'input-border-focus': '#6d90b1',
      'input-border-focus-darken': '#496a89',
      'border-color': '#6d90b1',
      'table-border-color': '#6d90b1',
      'hover-background-color': '#d1dce7',
      'link-color': '#60809f',
      'link-hover-color': '#435a70',
      'input-btn-focus-color': 'rgba(159, 182, 204, 0.25)',
    });
  });
  it('Calculate secondary colors', () => {
    expect(
      calculateCssVars({
        'brand-secondary': '#D3DBE3',
      })
    ).toEqual({
      'brand-secondary': '#D3DBE3',
      'brand-secondary-dark': '#a4b5c5',
    });
  });
  it('Calculate colors no override', () => {
    expect(
      calculateCssVars({
        'brand-secondary': '#D3DBE3',
        'brand-secondary-dark': 'red',
      })
    ).toEqual({
      'brand-secondary': '#D3DBE3',
      'brand-secondary-dark': 'red',
    });
  });
});
