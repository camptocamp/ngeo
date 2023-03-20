import './simple3d.css';
import angular from 'angular';
import olMap from 'ol/Map.js';

import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import ngeoOlcsOlcsModule from 'ngeo/olcs/olcsModule.js';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoOlcsManager from 'ngeo/olcs/Manager.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', ['gettext', ngeoMapModule.name, ngeoOlcsOlcsModule.name]);

/**
 * @constructor
 * @ngInject
 * @param {angular.IScope} $rootScope Root scope.
 * @param {import("ngeo/olcs/Service.js").OlcsService} ngeoOlcsService The service.
 */
function MainController($rootScope, ngeoOlcsService) {
  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
    view: new olView({
      center: [0, 0],
      zoom: 4,
    }),
  });

  // TODO: detect and use different URL for DEBUG MODE
  const cesiumUrl = '../node_modules/@camptocamp/cesium/Build/Cesium/Cesium.js';

  /**
   * @type {import('olcs/contrib/Manager.js').default}
   */
  this.ol3dm = new ngeoOlcsManager(cesiumUrl, $rootScope, {
    map: this.map,
  });

  // Optionally, the manager can be registered into the olcs service
  ngeoOlcsService.initialize(this.ol3dm);
}

module.controller('MainController', MainController);

export default module;
