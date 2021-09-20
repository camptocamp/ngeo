// The MIT License (MIT)
//
// Copyright (c) 2021 Camptocamp SA
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
import Backend from 'i18next-xhr-backend';
import {LitElement} from 'lit';
import LanguageDetector from 'i18next-browser-languagedetector';

const detectionOptions = {
  order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
  lookupQuerystring: 'lang',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',

  // cache user language
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'],
};

/**
 *
 */
export function setupI18n() {
  i18next
    .use(Backend)
    .use(LanguageDetector)
    .init({
      ns: ['app'],
      defaultNS: 'app',
      debug: true,
      detection: detectionOptions,
      fallbackLng: false,
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: '/.build/locale/webcomponent/{{lng}}/{{ns}}.json',
      },
    });

  const localize = locI18next.init(i18next);

  i18next.on('languageChanged', (lang) => {
    document.documentElement.lang = lang;
    localize('[data-i18n]');
  });
}

/**
 * @param {import('lit-element').LitElement} Base
 */
export class LitElementI18n extends LitElement {
  i18nLanguageChangedCallback_: () => void;

  connectedCallback() {
    this.i18nLanguageChangedCallback_ = () => this.requestUpdate();
    i18next.on('languageChanged', this.i18nLanguageChangedCallback_);
    super.connectedCallback();
  }

  disconnectedCallback() {
    i18next.off('languageChanged', this.i18nLanguageChangedCallback_);
    super.disconnectedCallback();
  }
}
