/**
 * @fileoverview This file provides a directive that creates an option list.
 * The options serve to switch quickly between differents places on the map.
 *
 * Example:
 * <gmf-locationchooser
 *   gmf-locationchooser-map="ctrl.map"
 *   gmf-locationchooser-locations="ctrl.locations">
 * </gmf-locationchooser>
 */
goog.provide('gmf.LocationchooserController');
goog.provide('gmf.locationchooserDirective');

goog.require('gmf');
goog.require('ol.Map');


/**
 * @return {angular.Directive} The directive specs.
 * @ngInject
 */
gmf.locationchooserDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'getMapFn': '&gmfLocationchooserMap',
      'getLocationsFn': '&gmfLocationchooserLocations'
    },
    controller: 'gmfLocationchooserController',
    controllerAs: 'ctrl',
    template: '<select ' +
        'ng-model="ctrl.selectedLocation" ' +
        'ng-options="location.label for location in ::ctrl.locations" ' +
        'ng-change="ctrl.setLocation()">' +
        '</select>'
  };
};

gmfModule.directive('gmfLocationchooser', gmf.locationchooserDirective);



/**
 * @param {angular.Scope} $scope The directive's scope.
 * @constructor
 * @export
 * @ngInject
 */
gmf.LocationchooserController = function($scope) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  var map = this.scope_['getMapFn']();
  goog.asserts.assertInstanceof(map, ol.Map);

  /**
   * @type {!ol.Map}
   * @private
   */
  this.map_ = map;

  var locations = this.scope_['getLocationsFn']();
  goog.asserts.assertArray(locations);

  /**
   * @type {Array.<gmfx.LocationchooserLocation>}
   * @export
   */
  this.locations = locations;

  /**
   * @type {gmfx.LocationchooserLocation}
   * @export
   */
  this.selectedLocation = this.locations[0];
};

gmfModule.controller('gmfLocationchooserController',
    gmf.LocationchooserController);


/**
 * @export
 */
gmf.LocationchooserController.prototype.setLocation = function() {
  var mapSize = this.map_.getSize();
  goog.asserts.assert(goog.isDefAndNotNull(mapSize));
  this.map_.getView().fit(this.selectedLocation.extent, mapSize);
};
