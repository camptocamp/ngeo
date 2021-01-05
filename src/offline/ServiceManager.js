// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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

class ServiceManager {
  /**
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @struct
   * @ngInject
   * @ngdoc service
   * @ngname ngeoOfflineServiceManager
   */
  constructor($injector) {
    /**
     * @type {angular.auto.IInjectorService}
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
   * @param {string|{save: Function}} saveLikeService
   * A service name that can be injected or an object that have a 'save' method.
   */
  setSaveService(saveLikeService) {
    this.saveService_ = this.getOfflineService_(saveLikeService, 'save');
  }

  /**
   * Set the service to call on 'restore'
   * @param {string|{restore: Function}} restoreLikeService
   * A service name that can be injected or an object that have a 'restore' method.
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
   * @param {import("ol/extent.js").Extent} extent The extent to download.
   * @param {import("ol/Map").default} map The map to work on.
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
   * @param {import("ol/Map.js").default} map The map to work on.
   * @return {Promise<import("ol/extent.js").Extent>} A promise to the extent of the downloaded area
   */
  restore(map) {
    if (!this.restoreService_) {
      console.warn('You must register a restoreService first');
      return Promise.reject();
    }
    return this.restoreService_.restore(map);
  }
}

ServiceManager.module = angular.module('ngeoOfflineServiceManager', []);
ServiceManager.module.service('ngeoOfflineServiceManager', ServiceManager);

export default ServiceManager;
