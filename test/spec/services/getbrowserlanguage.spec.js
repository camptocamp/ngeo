import angular from 'angular';
describe('ngeo.misc.getBrowserLanguage', () => {
  /** @type {Object<string, any>} */
  let win;
  /** @type {import('ngeo/misc/getBrowserLanguage.js').miscGetBrowserLanguage} */
  let ngeoGetBrowserLanguage;

  beforeEach(() => {
    win = {navigator: {}};
    angular.mock.module(
      /**
       * @param {angular.IModule} $provide
       */
      ($provide) => {
        $provide.value('$window', win);
      });
    angular.mock.inject((_ngeoGetBrowserLanguage_) => {
      ngeoGetBrowserLanguage = _ngeoGetBrowserLanguage_;
    });
  });

  it('gets language from navigator.languages', () => {
    win.navigator.languages = ['en-US', 'zh-CN', 'ja-JP', 'fr-FR'];
    const langCode = ngeoGetBrowserLanguage(['de', 'fr', 'it']);
    expect(langCode).toBe('fr');
  });

  it('gets language from navigator.language', () => {
    win.navigator.language = 'fr-FR';
    const langCode = ngeoGetBrowserLanguage(['de', 'fr', 'it']);
    expect(langCode).toBe('fr');
  });
});
