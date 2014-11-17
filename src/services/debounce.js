goog.provide('ngeo.Debounce');
goog.provide('ngeo_debounce_service');

goog.require('ngeo');


/**
 * @typedef {function(function(?), number, boolean):function()}
 */
ngeo.Debounce;


/**
 * Factory creating the ngeo "debounce" service.
 */
ngeoModule.factory('ngeoDebounce', ['$timeout',
  /**
   * @param {angular.$timeout} $timeout Angular timeout service.
   * @return {ngeo.Debounce} The debounce function.
   */
  function($timeout) {
    return (
        /**
         * @param {function(?)} func The function to debounce.
         * @param {number} wait The wait time in ms.
         * @param {boolean} invokeApply Whether the call to `func` is wrapped
         *    into an `$apply` call.
         * @return {function()} The wrapper function.
         */
        function(func, wait, invokeApply) {
          /**
           * @type {?angular.$q.Promise}
           */
          var timeout = null;
          return (
              function() {
                var context = this;
                var args = arguments;
                var later = function() {
                  timeout = null;
                  func.apply(context, args);
                };
                if (!goog.isNull(timeout)) {
                  $timeout.cancel(timeout);
                }
                timeout = $timeout(later, wait, invokeApply);
              });
        });
  }]);
