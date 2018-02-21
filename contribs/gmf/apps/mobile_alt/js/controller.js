/**
 * Application entry point.
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */
goog.provide('app.mobile_alt.Controller');

goog.require('app');
goog.require('gmf.controllers.AbstractMobileController');
goog.require('ngeo.proj.EPSG2056');
goog.require('ngeo.proj.EPSG21781');
goog.require('ol');
goog.require('ol.style.Fill');
goog.require('ol.style.RegularShape');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');

app.mobile_alt.module = angular.module('AppMobileAlt', [
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
app.mobile_alt.Controller = function($scope, $injector) {
  gmf.controllers.AbstractMobileController.call(this, {
    autorotate: true,
    mapPixelRatio: 1,
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


  /**
   * @type {ol.style.Style}
   * @export
   */
  this.customMeasureStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 128, 128, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: 'rgba(255, 0, 0, 0.5)',
      lineDash: [10, 10],
      width: 2
    }),
    image: new ol.style.RegularShape({
      stroke: new ol.style.Stroke({
        color: 'rgba(255, 0, 0, 0.7)',
        width: 2
      }),
      points: 4,
      radius: 8,
      radius2: 0,
      angle: 0
    })
  });

};
ol.inherits(app.mobile_alt.Controller, gmf.controllers.AbstractMobileController);


app.mobile_alt.module.controller('AlternativeMobileController', app.mobile_alt.Controller);
