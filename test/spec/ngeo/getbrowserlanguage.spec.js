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
