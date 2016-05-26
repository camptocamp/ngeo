goog.require('ngeo.filters');

describe('ngeo.Filters', function() {

  var $filter;

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('Ngeo Scalify', function() {
      var ngeoScalify = $filter('ngeoScalify')
      expect(ngeoScalify(25000)).toBe('1\u00a0:\u00a025,000');
  });

  it('Ngeo Number coordinates', function() {
      var ngeoNumberCoordinates = $filter('ngeoNumberCoordinates')
      var co = [7.1234, 46.9876];
      expect(ngeoNumberCoordinates(co)).toBe('7 47');
      expect(ngeoNumberCoordinates(co, 2, 'co {x} E; {y} N')).toBe(
          'co 7.12 E; 46.99 N');

      co = [2600000, 1600000];
      expect(ngeoNumberCoordinates(co, 0, '{x}, {y}')).toBe(
          '2,600,000, 1,600,000');
      expect(ngeoNumberCoordinates(co, 0, '{x}, {y}', true)).toBe(
          '2,600,000, 1,600,000');
      expect(ngeoNumberCoordinates(co, 0, '{x}, {y}', false)).toBe(
          '2\'600\'000, 1\'600\'000');
  });

  it('Ngeo DMS coordinates', function() {
      var ngeoDMSCoordinates = $filter('ngeoDMSCoordinates')
      var co = [7.1234, 46.9876];
      expect(ngeoDMSCoordinates(co)).toBe(
          '46\u00b0 59\u2032 15\u2033 N 7\u00b0 07\u2032 24\u2033 E');
      expect(ngeoDMSCoordinates(co, 2, '[{x}; {y}]')).toBe(
          '[46\u00b0 59\u2032 15.36\u2033 N; 7\u00b0 07\u2032 24.24\u2033 E]');
  });
});
