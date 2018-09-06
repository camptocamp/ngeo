/**
 * @module gmfapp.backgroundlayerselector
 */
const exports = {};

import './backgroundlayerselector.css';
import gmfBackgroundlayerselectorModule from 'gmf/backgroundlayerselector/module.js';

/** @suppress {extraRequire} */
import gmfMapComponent from 'gmf/map/component.js';

import gmfThemeThemes from 'gmf/theme/Themes.js';
import EPSG21781 from 'ngeo/proj/EPSG21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';


/** @type {!angular.Module} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfBackgroundlayerselectorModule.name,
  gmfMapComponent.name,
  gmfThemeThemes.module.name,
]);


exports.module.value(
  'gmfTreeUrl',
  'https://geomapfish-demo-dc.camptocamp.com/2.4/themes?' +
        'version=2&background=background');

exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @param {gmf.theme.Themes} gmfThemes Themes service.
 * @constructor
 * @ngInject
 */
exports.MainController = function(gmfThemes) {

  gmfThemes.loadThemes();

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new olMap({
    layers: [],
    view: new olView({
      center: [632464, 185457],
      projection: EPSG21781,
      minZoom: 3,
      zoom: 3
    })
  });
};


exports.module.controller('MainController', exports.MainController);


export default exports;
