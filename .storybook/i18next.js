import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const ns = ['app'];
const supportedLngs = ['en', 'fr'];

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    //debug: true,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'app',
    ns,
    supportedLngs,
  });

supportedLngs.forEach((lang) => {
  ns.forEach((n) => {
    i18next.addResources(lang, n, require(`../locales/${lang}/${n}.json`));
  });
});

export {i18next};
