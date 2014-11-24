goog.require('ngeo.GetBrowserLanguage');

describe('ngeo.GetBrowserLanguage', function() {
  var win;
  var ngeoGetBrowserLanguage;

  beforeEach(function() {
    win = {navigator: {}};
    module(function($provide) {
      $provide.value('$window', win);
    });
    inject(function($injector) {
      ngeoGetBrowserLanguage = $injector.get('ngeoGetBrowserLanguage');
    });
  });

  it('gets language from navigator.languages', function() {
    win.navigator.languages = ["en-US", "zh-CN", "ja-JP", "fr-FR"];
    var langCode = ngeoGetBrowserLanguage(['de', 'fr', 'it']);
    expect(langCode).toBe('fr');
  });

  it('gets language from navigator.language', function() {
    win.navigator.language = ["fr-FR"];
    var langCode = ngeoGetBrowserLanguage(['de', 'fr', 'it']);
    expect(langCode).toBe('fr');
  });
});
