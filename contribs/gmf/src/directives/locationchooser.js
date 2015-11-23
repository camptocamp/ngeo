goog.provide('gmf.LocationchooserController');
goog.provide('gmf.locationchooserDirective');

goog.require('gmf');
goog.require('ol.Map');


/**
 * This directive creates an options list that serves to switch quickly
 * between differents places on the map.
 * @example
 * <gmf-locationchooser
 *   gmf-locationchooser-map="ctrl.map"
 *   gmf-locationchooser-locations="ctrl.locations"
 *   gmf-locationchooser-selected="ctrl.selectedLocation">
 * </gmf-locationchooser>
 *
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @memberof gmf
 * @name gmfLocationchooser
 */
gmf.locationchooserDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'getMapFn': '&gmfLocationchooserMap',
      'getLocationsFn': '&gmfLocationchooserLocations',
      'selectedLocation': '=gmfLocationchooserSelected'
    },
    bindToController: true,
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
 * @ngdoc controller
 * @memberof gmf
 * @name gmfLocationchooserController
 */
gmf.LocationchooserController = function($scope) {

  var map = this['getMapFn']();
  goog.asserts.assertInstanceof(map, ol.Map);

  /**
   * @type {!ol.Map}
   * @private
   */
  this.map_ = map;

  var locations = this['getLocationsFn']();
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
  this.selectedLocation;

  if (!goog.isDef(this.selectedLocation)) {
    this.selectedLocation = this.locations[0];
  }

  $scope.$watch(goog.bind(function() {
    return this.selectedLocation;
  }, this), goog.bind(this.setLocation, this));

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
