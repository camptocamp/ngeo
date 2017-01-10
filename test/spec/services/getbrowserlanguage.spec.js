goog.require('ngeo.GetBrowserLanguage');

describe('ngeo.GetBrowserLanguage', () => {
  let win;
  let ngeoGetBrowserLanguage;

  beforeEach(() => {
    win = {navigator: {}};
    module(($provide) => {
      $provide.value('$window', win);
    });
    inject(($injector) => {
      ngeoGetBrowserLanguage = $injector.get('ngeoGetBrowserLanguage');
    });
  });

  it('gets language from navigator.languages', () => {
    win.navigator.languages = ['en-US', 'zh-CN', 'ja-JP', 'fr-FR'];
    const langCode = ngeoGetBrowserLanguage(['de', 'fr', 'it']);
    expect(langCode).toBe('fr');
  });

  it('gets language from navigator.language', () => {
    win.navigator.language = ['fr-FR'];
    const langCode = ngeoGetBrowserLanguage(['de', 'fr', 'it']);
    expect(langCode).toBe('fr');
  });
});
