goog.module('ngeo.olcs.Service');

const Service = class {
  constructor() {
    /**
     * @private
     * @type {olcs.Manager|undefined}
     */
    this.manager_;
  }

  /**
   * @export
   * @param {olcs.Manager} manager Manager.
   */
  initialize(manager) {
    this.manager_ = manager;
  }

  /**
   * @export
   * @return {olcs.Manager|undefined} the manager.
   */
  getManager() {
    return this.manager_;
  }

  /**
   * @export
   * @return {number} the min tilt.
   */
  getMinTilt() {
    return 0;
  }

  /**
   * @export
   * Almost Pi / 2
   * @return {number} the max tilt.
   */
  getMaxTilt() {
    return 7 * Math.PI / 16;
  }
};

const name = 'ngeoOlcsService';
Service.module = angular.module(name, []).service(name, Service);

exports = Service;
