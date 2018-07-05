goog.module('ngeo.offline.Mode');

const ngeoBase = goog.require('ngeo');

exports = class {

  /**
   * @ngInject
   * @ngdoc service
   * @ngname ngeoOfflineState
   */
  constructor() {

    /**
     * Offline mode is enabled or not.
     * @type {boolean}
     * @private
     */
    this.enabled_ = false;
  }

  /**
   * Return if we are in offline mode.
   * @return {boolean}
   * @export
   */
  isEnabled() {
    return this.enabled_;
  }

  /**
   * Enable offline mode. ATM we cannot escape from the offline mode.
   * @export
   */
  enable() {
    this.enabled_ = true;
  }
};

/**
 * @type {!angular.Module}
 */
exports.module = angular.module('ngeoOfflineMode', []);
exports.module.service('ngeoOfflineMode', exports);
ngeoBase.module.requires.push(exports.module.name);
