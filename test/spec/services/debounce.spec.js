goog.require('ngeo.Debounce');

describe('ngeo.Debounce', function() {
  var ngeoDebounce;
  var $timeout; 

  beforeEach(function() {
    inject(function($injector) {
      ngeoDebounce = $injector.get('ngeoDebounce');
      $timeout = $injector.get('$timeout');
    });
  });

  it('debounces the function', function() {
    var spy = jasmine.createSpy('debounced');
    var func = ngeoDebounce(spy, 200, false);
    var args = [1, 'foo'];
    func.apply(null, args);
    expect(spy).not.toHaveBeenCalled();
    func.apply(null, args);
    expect(spy).not.toHaveBeenCalled();
    func.apply(null, args);
    expect(spy).not.toHaveBeenCalled();
    $timeout.flush(200);
    expect(spy).toHaveBeenCalledWith(1, 'foo');
    expect(spy.calls.length).toEqual(1);
  });
});
