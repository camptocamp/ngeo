import angular from 'angular';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoDebounce', []);

/**
 * Provides a debounce function used to debounce calls to a user-provided function.
 * @template {function(?): void} T args
 * @typedef {function(T, number, boolean): T} miscDebounce
 */

/**
 * @template {function(?): void} T args
 * @param {T} func The function to debounce.
 * @param {number} wait The wait time in ms.
 * @param {boolean} invokeApply Whether the call to `func` is wrapped into an `$apply` call.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @return {T} The wrapper function.
 * @private
 * @hidden
 */
function debounce(func, wait, invokeApply, $timeout) {
  /**
   * @type {?angular.IPromise}
   */
  let timeout = null;
  return /** @type {T} */ (
    function (...args) {
      const context = this;
      const later = function () {
        timeout = null;
        func.apply(context, args);
      };
      if (timeout !== null) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(later, wait, invokeApply);
    }
  );
}

/**
 * Provides a debounce service. That service is a function
 * used to debounce calls to a user-provided function.
 *
 * @template {function(?): void} T args
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @return {import("ngeo/misc/debounce.js").miscDebounce<T>} The debounce function.
 *
 * @ngdoc service
 * @ngname ngeoDebounce
 * @ngInject
 * @private
 * @hidden
 */
function factory($timeout) {
  /** @type {function(T, number, boolean, angular.ITimeoutService): T} */
  const deb = debounce;
  return (func, wait, invokeApply) => {
    return deb(func, wait, invokeApply, $timeout);
  };
}

module.factory('ngeoDebounce', factory);

export default module;
