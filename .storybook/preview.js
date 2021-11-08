// Storybook global configuration for stories.

import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import './vars.css';

import i18next from 'i18next';
import {setupI18n} from 'ngeo/localize/i18n.ts';

// Default global configuration.
export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18next,
  locale: 'en',
  locales: {
    en: 'English',
    fr: 'Français',
  },
};

setupI18n({
  ns: ['app'],
  defaultNS: 'app',
  debug: true,
  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
    lookupQuerystring: 'lang',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',
    // cache user language
    caches: ['localStorage'],
    excludeCacheFor: ['cimode'],
  },
  fallbackLng: false,
  interpolation: {
    escapeValue: false,
  },
  backend: {
    loadPath: 'build/locale/webcomponent/{{lng}}/{{ns}}.json',
  },
});
