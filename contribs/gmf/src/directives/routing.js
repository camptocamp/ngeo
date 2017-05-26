goog.provide('gmf.routingDirective');

goog.require('gmf');
goog.require('gmf.RoutingService');


/**
 * Directive to display routing feature.
 * @return {angular.Directive}  The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfRouting
 */
gmf.routingDirective = function() {
  return {
    restrict: 'E',
    controller: 'GmfRoutingController as routeCtrl',
    templateUrl: `${gmf.baseTemplateUrl}/routing.html`
  };
};


/**
 * The controller for the routing directive.
 * @param {angular.Scope} $scope Scope.
 * @param {gmf.RoutingService} gmfRoutingService service for OSRM routing
 * @param {angular.$q} $q Angular q service
 * @constructor
 */
gmf.GmfRoutingController = function($scope, gmfRoutingService, $q) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {gmf.RoutingService}
   * @private
   */
  this.gmfRoutingService_ = gmfRoutingService;

  /**
   * @type {angular.$q}
   * @private
   */
  this.$q_ = $q;

};


gmf.module.directive('gmfRouting', gmf.routingDirective);
gmf.module.controller('GmfRoutingController', gmf.GmfRoutingController);
