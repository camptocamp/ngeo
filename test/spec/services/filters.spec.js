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

  it('Ngeo Swiss coordinates', function() {
      var ngeoSwissCoordinates = $filter('ngeoSwissCoordinates')
      var co1 = [2600000.1234, 1200000.5678];
      var co2 = [600000.1234, 200000.5678];
      expect(ngeoSwissCoordinates(co1)).toBe('2\'600\'000, 1\'200\'001');
      expect(ngeoSwissCoordinates(co2)).toBe('600\'000, 200\'001');
      expect(ngeoSwissCoordinates(co1, '[', '; ', ']')).toBe(
          '[2\'600\'000; 1\'200\'001]');
      expect(ngeoSwissCoordinates(co2, '[', '; ', ']')).toBe(
          '[600\'000; 200\'001]');
  });

  it('Ngeo East North coordinates', function() {
      var ngeoEastNorthCoordinates = $filter('ngeoEastNorthCoordinates')
      var co = [7.1234, 46.9876];
      expect(ngeoEastNorthCoordinates(co)).toBe('7 E 47 N');
      expect(ngeoEastNorthCoordinates(co, 2, '[', '; ', ']')).toBe(
          '[7.12 E; 46.99 N]');
  });

  it('Ngeo DMS coordinates', function() {
      var ngeoDMSCoordinates = $filter('ngeoDMSCoordinates')
      var co = [7.1234, 46.9876];
      expect(ngeoDMSCoordinates(co)).toBe(
          '46\u00b0 59\u2032 15\u2033 N 7\u00b0 07\u2032 24\u2033 E');
      expect(ngeoDMSCoordinates(co, 2, '[', '; ', ']')).toBe(
          '[46\u00b0 59\u2032 15.36\u2033 N; 7\u00b0 07\u2032 24.24\u2033 E]');
  });
});
