// The MIT License (MIT)
//
// Copyright (c) 2014-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoDebounce', []);

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
export function debounce(func, wait, invokeApply, $timeout) {
  /**
   * @type {?angular.IPromise<void>}
   */
  let timeout = null;
  return /** @type {T} */ (
    /**
     * @param {...any} args
     * @this {unknown} The context
     */
    function (...args) {
      const later = () => {
        timeout = null;
        // @ts-ignore
        func.apply(this, args);
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

myModule.factory('ngeoDebounce', factory);

export default myModule;
