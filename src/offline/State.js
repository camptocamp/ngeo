goog.module('ngeo.offline.State');

const ngeoBase = goog.require('ngeo');

exports = class {

  /**
   * @param {ngeo.offline.NetworkStatus} ngeoNetworkStatus ngeo network status service.
   * @ngInject
   * @ngdoc service
   * @ngname ngeoOfflineState
   */
  constructor(ngeoNetworkStatus) {

    /**
     * @type {ngeo.offline.NetworkStatus}
     * @private
     */
    this.ngeoNetworkStatus_ = ngeoNetworkStatus;

    /**
     * Offline mode.
     * @type {boolean}
     * @private
     */
    this.offlineDataLoaded_ = false;
  }

  /**
   * Is the application considered as offline. Either disconnected or in
   * offline mode.
   * @return {boolean}
   * @export
   */
  isOffline() {
    return this.ngeoNetworkStatus_.offline || this.offlineDataLoaded_;
  }

  /**
   * Return if we get in offline mode.
   * @return {boolean}
   * @export
   */
  isOfflineDataLoaded() {
    return this.offlineDataLoaded_;
  }

  /**
   * Enter offline mode. ATM we cannot escape from the offline mode.
   * @export
   */
  loadOfflineData() {
    this.offlineDataLoaded_ = true;
  }
};

/**
 * @type {!angular.Module}
 */
exports.module = angular.module('ngeoOfflineState', []);
exports.module.service('ngeoOfflineState', exports);
ngeoBase.module.requires.push(exports.module.name);
