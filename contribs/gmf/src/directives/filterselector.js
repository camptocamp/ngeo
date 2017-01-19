goog.provide('gmf.FilterselectorController');
goog.provide('gmf.filterselectorComponent');

goog.require('gmf');


gmf.FilterselectorController = class {

  /**
   * @param {!angular.Scope} $scope Angular scope.
   * @ngInject
   * @ngdoc controller
   * @ngname GmfFilterselectorController
   */
  constructor($scope) {

    // Binding properties

    /**
     * @type {boolean}
     * @export
     */
    this.active;

    $scope.$watch(
      () => this.active,
      this.handleActiveChange_.bind(this)
    );
  }

  /**
   * Called when the active property of the this directive changes. Manage
   * the activation/deactivation accordingly.
   * @param {boolean} active Whether the directive is active or not.
   * @private
   */
  handleActiveChange_(active) {
    // Work in progress...
  }
};


gmf.module.component('gmfFilterselector', {
  bindings: {
    active: '<'
  },
  controller: gmf.FilterselectorController,
  controllerAs: 'fsCtrl',
  templateUrl: () => `${gmf.baseTemplateUrl}/filterselector.html`
});
