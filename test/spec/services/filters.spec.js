goog.require('ngeo.filters');

describe('ngeo.Filters', function() {

  var $filter;

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('ngeo scalify', function() {
      var ngeoScalify = $filter('ngeoScalify')
      expect(ngeoScalify(25000)).toBe('1\u00a0:\u00a025,000');
  });
});
