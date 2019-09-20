import './asitvd.css';
import angular from 'angular';
import ngeoSourceAsitVD from 'ngeo/source/AsitVD.js';
import EPSG2056 from '@geoblocks/proj/src/EPSG_2056.js';

import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import ngeoMapModule from 'ngeo/map/module.js';


/** @type {angular.IModule} */
const module = angular.module('app', [
  'gettext',
  ngeoMapModule.name
]);


/**
 * @constructor
 * @ngInject
 */
function MainController() {
  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new ngeoSourceAsitVD({
          layer: 'asitvd.fond_couleur'
        })
      })
    ],
    view: new olView({
      projection: EPSG2056,
      resolutions: [250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5],
      center: [2535000, 1154000],
      zoom: 0
    })
  });
}

module.controller('MainController', MainController);


export default module;
