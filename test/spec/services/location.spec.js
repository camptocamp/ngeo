goog.require('ngeo.Location');

describe('ngeo.Location', function() {
  var win;
  var ngeoLocation;

  beforeEach(function() {
    win = {
      'location': 'http://domain.com/some/path?some=param',
      'history': {'replaceState': function() {}}
    };
    spyOn(win.history, 'replaceState');
    module(function($provide) {
      $provide.value('$window', win);
    });
    inject(function($injector) {
      ngeoLocation = $injector.get('ngeoLocation');
    });
  });

  describe('#getUri', function() {
    it('returns the URI', function() {
      var uri = ngeoLocation.getUri();
      expect(uri).toBe('http://domain.com/some/path?some=param');
    });
    it('returns the URI with additional params', function() {
      var uri = ngeoLocation.getUri({'another': 'param'});
      expect(uri).toBe('http://domain.com/some/path?some=param&another=param');
    });
  });

  describe('#getParam', function() {
    it('returns the param value', function() {
      var value = ngeoLocation.getParam('some');
      expect(value).toBe('param');
    });
  });

  describe('#deleteParam', function() {
    it('delete the params', function() {
      ngeoLocation.deleteParam('some');
      var uri = ngeoLocation.getUri();
      expect(uri).toBe('http://domain.com/some/path');
    });
  });

  describe('#refresh', function() {
    it('calls history.replaceState with expected args', function() {
      ngeoLocation.refresh();
      expect(win.history.replaceState).toHaveBeenCalledWith(
        null, '', 'http://domain.com/some/path?some=param');
    });
  });
});
