/**
 * @module ngeo.offline.ServiceManager
 */

const exports = class {

  /**
   * @param {angular.$injector} $injector Main injector.
   * @struct
   * @ngInject
   * @ngdoc service
   * @ngname ngeoOfflineServiceManager
   */
  constructor($injector) {

    /**
     * @type {angular.$injector}
     * @private
     */
    this.$injector_ = $injector;

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
  }

  /**
   * @param {string|Object} serviceLike A service like.
   * @param {string} method A method.
   * @return {Object} A returned object.
   */
  getOfflineService_(serviceLike, method) {
    if (typeof serviceLike === 'string') {
      if (!this.$injector_.has(serviceLike)) {
        console.error(`The offline ${method} service could not be found`);
        return;
      }
      const service = this.$injector_.get(serviceLike);
      if (!service[method]) {
        console.error(`The offline service ${serviceLike} does not have a ${method} method`);
        return;
      }
      return service;
    }
    if (!serviceLike[method]) {
      console.error(`The provided offline service does not have a ${method} method`);
      return;
    }
    return serviceLike;
  }

  /**
   * Set the service to call on 'save'.
   * @param {string|{save: Function}} saveLikeService A service name that can be injected or an object that have a 'save' method.
   */
  setSaveService(saveLikeService) {
    this.saveService_ = this.getOfflineService_(saveLikeService, 'save');
  }

  /**
   * Set the service to call on 'restore'
   * @param {string|{restore: Function}} restoreLikeService A service name that can be injected or an object that have a 'restore' method.
   */
  setRestoreService(restoreLikeService) {
    this.restoreService_ = this.getOfflineService_(restoreLikeService, 'restore');
  }

  cancel() {
    if (!this.saveService_) {
      console.warn('You must register a saveService first');
      return;
    }
    this.saveService_.cancel();
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
   * @param {ol.Map} map The map to work on.
   * @return {Promise<ol.Extent>} A promise to the extent of the downloaded area
   */
  restore(map) {
    if (!this.restoreService_) {
      console.warn('You must register a restoreService first');
      return Promise.reject();
    }
    return this.restoreService_.restore(map);
  }
};

/**
 * @type {!angular.Module}
 */
exports.module = angular.module('ngeoOfflineServiceManager', []);
exports.module.service('ngeoOfflineServiceManager', exports);


export default exports;
