/**
 * Application entry point.
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */
goog.provide('app.mobile.Controller');

goog.require('app');
goog.require('gmf.controllers.AbstractMobileController');
goog.require('ngeo.proj.EPSG2056');
goog.require('ngeo.proj.EPSG21781');
goog.require('ol');

app.mobile.module = angular.module('AppMobile', [
  app.module.name,
  gmf.controllers.AbstractMobileController.module.name,
]);


/**
 * @param {angular.Scope} $scope Scope.
 * @param {angular.$injector} $injector Main injector.
 * @constructor
 * @extends {gmf.controllers.AbstractMobileController}
 * @ngInject
 * @export
 */
app.mobile.Controller = function($scope, $injector) {
  gmf.controllers.AbstractMobileController.call(this, {
    autorotate: false,
    srid: 21781,
    mapViewConfig: {
      center: [632464, 185457],
      zoom: 3,
      resolutions: [250, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05]
    }
  }, $scope, $injector);

  /**
   * @type {Array.<gmf.mobile.measure.pointComponent.LayerConfig>}
   * @export
   */
  this.elevationLayersConfig = [
    {name: 'aster', unit: 'm'},
    {name: 'srtm', unit: 'm'}
  ];

  /**
   * @type {number}
   * @export
   */
  this.searchDelay = 50;

  /**
   * @type {Array.<string>}
   * @export
   */
  this.searchCoordinatesProjections = [ngeo.proj.EPSG21781, ngeo.proj.EPSG2056, 'EPSG:4326'];

};
ol.inherits(app.mobile.Controller, gmf.controllers.AbstractMobileController);


app.mobile.module.controller('MobileController', app.mobile.Controller);
