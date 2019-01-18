/**
 */

import angular from 'angular';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoDebounce', []);

/**
 * Provides a debounce function used to debounce calls to a user-provided
 * function.
 * @typedef {function(function(?), number, boolean):function()} miscDebounce
 */

/**
 * Provides a debounce service. That service is a function
 * used to debounce calls to a user-provided function.
 *
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @return {miscDebounce} The debounce function.
 *
 * @ngdoc service
 * @ngname ngeoDebounce
 * @ngInject
 */
const factory = function($timeout) {
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
       * @type {?angular.IPromise}
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
        }
      );
    });
};

exports.factory('ngeoDebounce', factory);


export default module;
