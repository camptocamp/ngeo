goog.provide('ngeo.misc.debounce');

goog.require('ngeo');


/**
 * @type {!angular.Module}
 */
ngeo.misc.debounce = angular.module('ngeoDebounce', []);


/**
 * Provides a debounce service. That service is a function
 * used to debounce calls to a user-provided function.
 *
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @return {ngeox.miscDebounce} The debounce function.
 *
 * @ngdoc service
 * @ngname ngeoDebounce
 * @ngInject
 */
ngeo.misc.debounce.factory_ = function($timeout) {
  return (
    // FIXME: eslint can't detect that the function returns a function
    /**
     * @param {function(?)} func The function to debounce.
     * @param {number} wait The wait time in ms.
     * @param {boolean} invokeApply Whether the call to `func` is wrapped
     *    into an `$apply` call.
     * return {function()} The wrapper function.
     */
    function(func, wait, invokeApply) {
      /**
       * @type {?angular.$q.Promise}
       */
      let timeout = null;
      return (
        function(...args) {
          const context = this;
          const later = function() {
            timeout = null;
            func.apply(context, args);
          };
          if (timeout !== null) {
            $timeout.cancel(timeout);
          }
          timeout = $timeout(later, wait, invokeApply);
        });
    });
};

ngeo.misc.debounce.factory('ngeoDebounce', ngeo.misc.debounce.factory_);
