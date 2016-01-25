goog.provide('ngeo.Debounce');

goog.require('ngeo');


/**
 * Provides a debounce service. That service is a function
 * used to debounce calls to a user-provided function.
 *
 * @typedef {function(function(?), number, boolean):function()}
 * @ngdoc service
 * @ngname ngeoDebounce
 */
ngeo.Debounce;


/**
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @return {ngeo.Debounce} The debounce function.
 * @ngInject
 */
ngeo.debounceServiceFactory = function($timeout) {
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
};


ngeo.module.factory('ngeoDebounce', ngeo.debounceServiceFactory);
