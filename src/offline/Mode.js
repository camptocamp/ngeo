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

    /**
     * Offline component.
     * @type {ngeo.offline.component.Controller|undefined}
     * @private
     */
    this.component_;
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

  /**
   *
   * @param {ngeo.offline.component.Controller} component Offline component.
   * @export
   */
  registerComponent(component) {
    this.component_ = component;
  }

  /**
   * @export
   */
  activateOfflineMode() {
    this.component_.activateOfflineMode();
  }
};

/**
 * @type {!angular.Module}
 */
exports.module = angular.module('ngeoOfflineMode', []);
exports.module.service('ngeoOfflineMode', exports);
ngeoBase.module.requires.push(exports.module.name);
