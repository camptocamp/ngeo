goog.module('ngeo.olcs.Service');

const Service = class {
  constructor() {
    /**
     * @private
     * @type {olcs.contrib.Manager|undefined}
     */
    this.manager_;
  }

  /**
   * @export
   * @param {olcs.contrib.Manager} manager Manager.
   */
  initialize(manager) {
    this.manager_ = manager;
  }

  /**
   * @export
   * @return {olcs.contrib.Manager|undefined} the manager.
   */
  getManager() {
    return this.manager_;
  }
};

const name = 'ngeoOlcsService';
Service.module = angular.module(name, []).service(name, Service);

exports = Service;
