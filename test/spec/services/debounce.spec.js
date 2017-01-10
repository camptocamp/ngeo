goog.require('ngeo.Debounce');

describe('ngeo.Debounce', () => {
  let ngeoDebounce;
  let $timeout;

  beforeEach(() => {
    inject(($injector) => {
      ngeoDebounce = $injector.get('ngeoDebounce');
      $timeout = $injector.get('$timeout');
    });
  });

  it('debounces the function', () => {
    const spy = jasmine.createSpy('debounced');
    const func = ngeoDebounce(spy, 200, false);
    const args = [1, 'foo'];
    func(...args);
    expect(spy).not.toHaveBeenCalled();
    func(...args);
    expect(spy).not.toHaveBeenCalled();
    func(...args);
    expect(spy).not.toHaveBeenCalled();
    $timeout.flush(200);
    expect(spy).toHaveBeenCalledWith(1, 'foo');
    expect(spy.calls.count()).toEqual(1);
  });
});
