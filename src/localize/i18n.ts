// The MIT License (MIT)
//
// Copyright (c) 2021-2022 Camptocamp SA
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

import i18next from 'i18next';
//@ts-ignore
import locI18next from 'loc-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {InitOptions} from 'i18next';
import {Configuration} from 'gmfapi/store/config';

/**
 * @param config The GeoMapFish configuration
 */
export function setupI18n(config: Configuration): void {
  const gmfI18nextConfiguration: InitOptions = config.gmfI18nextConfiguration || {};

  i18next
    .use(Backend)
    .use(LanguageDetector)
    .init(gmfI18nextConfiguration)
    .catch((error: string) => {
      console.error(`Unable to initialize the i18next: ${error}`);
    });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const localize = locI18next.init(i18next);

  i18next.on('languageChanged', (lang) => {
    document.documentElement.lang = lang;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    localize('[data-i18n]');
  });
}
