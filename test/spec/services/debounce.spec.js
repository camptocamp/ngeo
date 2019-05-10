// @ts-nocheck
import angular from 'angular';
describe('ngeo.misc.debounce', () => {
  /** @type {import("ngeo/misc/debounce.js").miscDebounce<function(): void>} */
  let ngeoDebounce;
  /** @type {angular.ITimeoutService} */
  let $timeout;

  beforeEach(() => {
    angular.mock.inject((_ngeoDebounce_, _$timeout_) => {
      ngeoDebounce = _ngeoDebounce_;
      $timeout = _$timeout_;
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
