/**
 */
import './mapswipe.css';
import angular from 'angular';
import ngeoMapswipeModule from 'ngeo/map/swipe.js';
import ngeoMapModule from 'ngeo/map/module.js';
import olLayerTile from 'ol/layer/Tile.js';
import olMap from 'ol/Map.js';
import olSourceOSM, {ATTRIBUTION} from 'ol/source/OSM.js';
import olView from 'ol/View.js';

/** @type {angular.IModule} **/
const module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoMapswipeModule.name
]);

/**
 * @constructor
 * @ngInject
 */
function MainController() {

  const openStreetMapLayer = new olLayerTile({
    source: new olSourceOSM()
  });

  /**
   * @type {import('ol/layer/Tile.js').default}
   */
  this.openSeaMapLayer = new olLayerTile({
    source: new olSourceOSM({
      attributions: [
        'All maps © <a href="http://www.openseamap.org/">OpenSeaMap</a>',
        ATTRIBUTION
      ],
      opaque: false,
      url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'
    })
  });

  /**
   * @type {import('ol/Map.js').default}
   */
  this.map = new olMap({
    layers: [
      openStreetMapLayer,
      this.openSeaMapLayer
    ],
    view: new olView({
      center: [-244780.24508882355, 5986452.183179816],
      zoom: 15
    })
  });
}

module.controller('MainController', MainController);

export default module;
