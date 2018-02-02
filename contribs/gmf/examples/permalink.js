goog.provide('gmfapp.permalink');

// webpack: import './permalink.css';
// webpack: import './common_dependencies.js';
goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ol.style.RegularShape');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/** @type {!angular.Module} **/
gmfapp.permalink.module = angular.module('gmfapp', [
  gmf.map.component.name,
]);

gmfapp.permalink.constant('defaultTheme', 'Demo');
gmfapp.permalink.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


gmfapp.permalink.module.value('gmfPermalinkOptions',
  /** @type {gmfx.PermalinkOptions} */ ({
    crosshairStyle: new ol.style.Style({
      image: new ol.style.RegularShape({
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 255, 1)',
          width: 2
        }),
        points: 4,
        radius: 8,
        radius2: 0,
        angle: 0
      })
    })
  }));

/**
 * @constructor
 * @ngInject
 */
gmfapp.permalink.MainController = function() {
  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      projection: 'EPSG:21781',
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 3
    })
  });
};

gmfapp.permalink.module.controller('MainController', gmfapp.permalink.MainController);
