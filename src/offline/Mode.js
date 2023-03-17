import angular from 'angular';

class Mode {
  /**
   * @param {import("ngeo/offline/Configuration.js").default} ngeoOfflineConfiguration
   * ngeo offline configuration service.
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
     * @type {import("ngeo/offline/component.js").Controller|undefined}
     * @private
     */
    this.component_;

    /**
     * @private
     * @type {import("ngeo/offline/Configuration.js").default}
     */
    this.ngeoOfflineConfiguration_ = ngeoOfflineConfiguration;
  }

  /**
   * Return if we are in offline mode.
   * @return {boolean} whether offline mode is enabled
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
   * @param {import("ngeo/offline/component.js").Controller} component Offline component.
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
}

/**
 * @type {!angular.IModule}
 */
const module = angular.module('ngeoOfflineMode', []);
module.service('ngeoOfflineMode', Mode);
Mode.module = module;

export default Mode;
