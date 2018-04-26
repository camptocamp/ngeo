/**
 * @module gmfapp.permalink
 */
const exports = {};

import './permalink.css';
/** @suppress {extraRequire} */
import gmfMapComponent from 'gmf/map/component.js';

import EPSG21781 from 'ngeo/proj/EPSG21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import olStyleRegularShape from 'ol/style/RegularShape.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';


/** @type {!angular.Module} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfMapComponent.name,
]);

exports.module.constant('defaultTheme', 'Demo');
exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


exports.module.value('gmfPermalinkOptions',
  /** @type {gmfx.PermalinkOptions} */ ({
    crosshairStyle: new olStyleStyle({
      image: new olStyleRegularShape({
        stroke: new olStyleStroke({
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
exports.MainController = function() {
  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      })
    ],
    view: new olView({
      projection: EPSG21781,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 3
    })
  });
};

exports.module.controller('MainController', exports.MainController);


export default exports;
