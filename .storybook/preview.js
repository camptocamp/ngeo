// Storybook global configuration for stories.

import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import i18next from 'i18next';
import {setupI18n} from 'ngeo/localize/i18n.ts';

// Default global configuration.
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
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
}

setupI18n();
