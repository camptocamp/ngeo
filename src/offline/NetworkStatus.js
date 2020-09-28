// The MIT License (MIT)
//
// Copyright (c) 2018-2020 Camptocamp SA
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

import ngeoMiscDebounce from 'ngeo/misc/debounce.js';
import angular from 'angular';

const Service = class {
  /**
   * This service watches the status of network connection.
   *
   * Currently it watches every $http and $.ajax requests errors, if an error
   * occurs we wait 2 sec then we make an http request on the checker file.
   * If the checker responds that means we are online, otherwise we make a
   * 2nd request 2 sec later, if the 2nd requests failed that means we
   * are offline.
   *
   * A timeout of 1 sec is set for the checker file, so if we have a bad
   * connection, we consider we are offline.
   *
   * During offline mode we test every 2 sec if we are back online.
   *
   * @ngInject
   * @param {!jQuery} $document Angular document service.
   * @param {angular.IWindowService} $window Angular window service.
   * @param {angular.ITimeoutService} $timeout Angular timeout service.
   * @param {angular.IScope} $rootScope The root scope.
   * @param {import('ngeo/options.js').ngeoOfflineTestUrl} ngeoOfflineTestUrl URL of the test page.
   */
  constructor($document, $window, $timeout, $rootScope, ngeoOfflineTestUrl) {
    /**
     * @private
     * @type {!jQuery}
     */
    this.$document_ = $document;

    /**
     * @private
     * @type {!Window}
     */
    this.$window_ = $window;

    /**
     * @private
     * @type {!angular.ITimeoutService}
     */
    this.$timeout_ = $timeout;

    /**
     * @private
     * @type {angular.IScope}
     */
    this.$rootScope_ = $rootScope;

    /**
     * @private
     * @type {import('ngeo/options.js').ngeoOfflineTestUrl}
     */
    this.ngeoOfflineTestUrl_ = ngeoOfflineTestUrl;

    /**
     * @private
     * @type {!number}
     */
    this.count_ = 0;

    /**
     * @type {!boolean|undefined}
     * @private
     */
    this.offline_;

    /**
     * @private
     * @type {angular.IPromise<void>|undefined}
     */
    this.promise_;

    this.initialize_();
  }

  initialize_() {
    this.offline_ = !this.$window_.navigator.onLine;

    // airplane mode, works offline(firefox)
    this.$window_.addEventListener('offline', () => {
      this.triggerChangeStatusEvent_(true);
    });

    // online event doesn't means we have a internet connection, that means we
    // have possiby one (connected to a router ...)
    this.$window_.addEventListener('online', () => {
      this.check(undefined);
    });

    // We catch every $.ajax request errors or (canceled request).
    // @ts-ignore
    if (this.$document_.ajaxError) {
      /**
       * @param {unknown} evt
       * @param {unknown} jqxhr
       * @param {unknown} settings
       * @param {string} thrownError
       */
      const onAjaxError = (evt, jqxhr, settings, thrownError) => {
        // Filter out canceled requests
        if (!/^(canceled|abort)$/.test(thrownError)) {
          this.check(2000);
        }
      };
      // @ts-ignore
      this.$document_.ajaxError(onAjaxError);
    }
  }

  /**
   * Check fir network status
   *
   * @param {number=} timeout Delay for timeout.
   */
  check(timeout) {
    if (this.promise_) {
      this.$timeout_.cancel(this.promise_);
      this.promise_ = undefined;
    }
    if (timeout !== undefined) {
      this.count_++;
      this.promise_ = this.$timeout_(() => this.check(), timeout);
      return;
    }
    $.ajax({
      method: 'GET',
      url: this.ngeoOfflineTestUrl_,
      timeout: 1000,
      success: () => {
        this.count_ = 0;
        if (this.offline_) {
          this.triggerChangeStatusEvent_(false);
        }
      },
      error: () => {
        this.count_++;
        // We consider we are offline after 3 requests failed
        if (this.count_ > 2 && !this.offline_) {
          this.triggerChangeStatusEvent_(true);
        }
      },
    });
  }

  /**
   * @param {boolean} offline whether it's offline or not.
   * @private
   */
  triggerChangeStatusEvent_(offline) {
    this.offline_ = offline;
    // this.$rootScope_.$broadcast('ngeoNetworkStatusChange', net.offline);
    this.$rootScope_.$digest();
  }

  /**
   * @return {boolean} True if we are disconnected.
   * @export
   */
  isDisconnected() {
    return !!this.offline_;
  }
};

const name = 'ngeoNetworkStatus';

Service.module = angular.module(name, [ngeoMiscDebounce.name]);
Service.module.service(name, Service);

/**
 * @ngInject
 * @param {angular.IQService} $q The Angular $q service.
 * @param {import("ngeo/misc/debounce.js").miscDebounce<function()>} ngeoDebounce ngeo debounce service.
 * @param {Service} ngeoNetworkStatus ngeo network status service.
 * @return {angular.IHttpInterceptor} the interceptor
 */
const httpInterceptor = function ($q, ngeoDebounce, ngeoNetworkStatus) {
  const debouncedCheck = ngeoDebounce(() => ngeoNetworkStatus.check(undefined), 2000, false);
  return {
    request(config) {
      return config;
    },
    requestError(rejection) {
      return $q.reject(rejection);
    },
    response(response) {
      return response;
    },
    responseError(rejection) {
      debouncedCheck();
      return $q.reject(rejection);
    },
  };
};
Service.module.factory('httpInterceptor', httpInterceptor);

/**
 * @ngInject
 * @private
 * @param {angular.IHttpProvider} $httpProvider .
 */
function configFunction_($httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor');
}
Service.module.config(configFunction_);

const exports = Service;

export default exports;
