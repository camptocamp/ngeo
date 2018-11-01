/**
 * @module ngeo.offline.Mode
 */

const exports = class {

  /**
   * @param {ngeo.offline.Configuration} ngeoOfflineConfiguration ngeo offline configuration service.
   * @ngInject
   * @ngdoc service
   * @ngname ngeoOfflineState
   */
  constructor(ngeoOfflineConfiguration) {

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

    /**
     * @private
     * @type {ngeo.offline.Configuration}
     */
    this.ngeoOfflineConfiguration_ = ngeoOfflineConfiguration;
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

  /**
   * @return {boolean} True if data are accessible offline.
   * @export
   */
  hasData() {
    return this.ngeoOfflineConfiguration_.hasOfflineData();
  }

};

/**
 * @type {!angular.Module}
 */
exports.module = angular.module('ngeoOfflineMode', []);
exports.module.service('ngeoOfflineMode', exports);


export default exports;
