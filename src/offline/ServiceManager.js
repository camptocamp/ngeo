goog.module('ngeo.offline.ServiceManager');

goog.require('ngeo.offline.NetworkStatus');
const ngeoBase = goog.require('ngeo');


exports = class {

  /**
   * @param {!angular.Scope} $rootScope Angular rootScope.
   * @param {angular.$injector} $injector Main injector.
   * @param {ngeo.offline.NetworkStatus} ngeoNetworkStatus ngeo Network Status.
   * @struct
   * @ngInject
   * @ngdoc service
   * @ngname ngeoOfflineServiceManager
   */
  constructor($injector, $rootScope, ngeoNetworkStatus) {

    /**
     * @type {angular.$injector}
     * @private
     */
    this.$injector_ = $injector;

    /**
     * @type {ngeo.offline.NetworkStatus}
     * @private
     */
    this.ngeoNetworkStatus_ = ngeoNetworkStatus;

    /**
     * @type {*}
     * @private
     */
    this.saveService_ = null;

    /**
     * @type {*}
     * @private
     */
    this.restoreService_ = null;

    /**
     * @type {boolean}
     * @private
     */
    this.isRestored_ = false;

    $rootScope.$watch(
        () => {
            return this.ngeoNetworkStatus_.offline;
        }, () => {
        if (this.ngeoNetworkStatus_.offline && !this.isRestored_) {
          this.isRestored_ = true;
          this.restore();
        }
      });
  }

  /**
   * Set the service to call on 'save'.
   * @param {string|null} saveServiceName A service name that can be injected and that have a 'save' method.
   */
  setSaveService(saveServiceName) {
    if (saveServiceName && this.$injector_.has(saveServiceName)) {
      const saveService = this.$injector_.get(saveServiceName);
      if (!saveService.save) {
        console.warn('Your offline save service must have a "save" function');
        return;
      }
      this.saveService_ = saveService;
    }
  }

  /**
   * Set the service to call on 'restore'
   * @param {string|null} restoreServiceName A service name that can be injected and that have a 'restore' method.
   */
  setRestoreService(restoreServiceName) {
    if (restoreServiceName && this.$injector_.has(restoreServiceName)) {
      const restoreService = this.$injector_.get(restoreServiceName);
      if (!restoreService.restore) {
        console.warn('Your offline restore service must have a "restore" function');
        return;
      }
      this.restoreService_ = restoreService;
    }
  }

  /**
   * Ask the provided service to save the data to an offline purpose
   * @param {ol.Extent} extent The extent to dowload.
   * @param {ol.Map} map The map to work on.
   */
  save(extent, map) {
    if (!this.saveService_) {
      console.warn('You must register a saveService first');
      return;
    }
    this.saveService_.save(extent, map);
  }

  /**
   * Ask the provided service to restore the saved data on the map
   */
  restore() {
    if (!this.restoreService_) {
      console.warn('You must register a restoreService first');
      return;
    }
    this.restoreService_.restore();
  }
};

/**
 * @type {!angular.Module}
 */
exports.module = angular.module('ngeoOfflineServiceManager', []);
exports.module.service('ngeoOfflineServiceManager', exports);
ngeoBase.module.requires.push(exports.module.name);
