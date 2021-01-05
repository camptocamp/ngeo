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

import {getBrowserLanguage} from 'ngeo/utils.js';
import {stub} from 'sinon';

describe('ngeo.misc.getBrowserLanguage', () => {
  /** @type {any} */
  let languages;
  /** @type {any} */
  let language;

  beforeEach(() => {
    languages = stub(window.navigator, 'languages');
    language = stub(window.navigator, 'language');
  });

  afterEach(() => {
    languages.restore();
    language.restore();
  });

  it('gets language from navigator.languages', () => {
    languages.value(['en-US', 'zh-CN', 'ja-JP', 'fr-FR']);
    const langCode = getBrowserLanguage(['de', 'fr', 'it']);
    expect(langCode).toBe('fr');
  });

  it('gets language from navigator.language', () => {
    languages.value(undefined);
    language.value('fr-FR');
    const langCode = getBrowserLanguage(['de', 'fr', 'it']);
    expect(langCode).toBe('fr');
  });
});
