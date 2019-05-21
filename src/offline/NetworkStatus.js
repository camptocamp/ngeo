/**
 * @module ngeo.offline.NetworkStatus
 */
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';


/**
 * @ngInject
 * @param {angular.$q} $q The Angular $q service.
 * @param {ngeox.miscDebounce} ngeoDebounce ngeo debounce service.
 * @param {ngeo.offline.NetworkStatus} ngeoNetworkStatus ngeo network status service.
 * @return {angular.$http.Interceptor} the interceptor
 */
const httpInterceptor = function($q, ngeoDebounce, ngeoNetworkStatus) {
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
    }
  };
};

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
   * @param {angular.$window} $window Angular window service.
   * @param {!angular.$timeout} $timeout Angular timeout service.
   * @param {angular.Scope} $rootScope The root scope.
   * @param {string} ngeoOfflineTestUrl Url of the test page.
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
     * @type {!angular.$timeout}
     */
    this.$timeout_ = $timeout;

    /**
     * @private
     * @type {angular.Scope}
     */
    this.$rootScope_ = $rootScope;

    /**
     * @private
     * @type {string}
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
     * @type {angular.$q.Promise|undefined}
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
    this.$document_.ajaxError((evt, jqxhr, settings, thrownError) => {
      // Filter out canceled requests
      if (!/^(canceled|abort)$/.test(thrownError)) {
        this.check(2000);
      }
    });

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
      }
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

Service.module = angular.module(name, [
  ngeoMiscDebounce.name
]);
Service.module.factory('httpInterceptor', httpInterceptor);
Service.module.service(name, Service);

/**
 * @ngInject
 * @private
 * @param {angular.$HttpProvider} $httpProvider .
 */
Service.module.configFunction_ = function($httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor');
};
Service.module.config(Service.module.configFunction_);

Service.module.value('ngeoOfflineTestUrl', '');

const exports = Service;


export default exports;
