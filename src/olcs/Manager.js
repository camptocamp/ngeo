goog.module('ngeo.olcs.Manager');
goog.module.declareLegacyNamespace();

goog.require('olcs.contrib.Manager');

const Manager = class extends olcs.contrib.Manager {
  /**
   * @param {string} url .
   * @param {angular.Scope} $rootScope .
   * @param {olcsx.contrib.ManagerOptions} options .
   */
  constructor(url, $rootScope, options) {
    super(url, options);
    /**
     * @type {angular.Scope}
     * @private
     */
    this.rootScope_ = $rootScope;
  }


  /**
   * @override
   * @export
   */
  toggle3d() {
    // The transition is asynchronous and at the end of it the state of OLCesium is changed.
    // In order to have all code dependent on OLCesium state updated, we kick an Angular digest cycle.
    const promise = super.toggle3d();
    return promise.then(() => {
      this.rootScope_.$apply();
    });
  }
};

exports = Manager;
