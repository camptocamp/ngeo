import './drawfeature.css';
import angular from 'angular';
import ngeoDrawModule from 'ngeo/draw/module.js';

import ngeoMapModule from 'ngeo/map/module.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', [
  'gettext',
  ngeoDrawModule.name,
  ngeoMapModule.name,
  ngeoMiscToolActivateMgr.name,
]);

/**
 * @param {!angular.IScope} $scope Angular scope.
 * @param {import("ol/Collection.js").default.<import("ol/Feature.js").default>} ngeoFeatures Collection
 *    of features.
 * @param {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @ngInject
 * @constructor
 */
function MainController($scope, ngeoFeatures, ngeoToolActivateMgr) {
  /**
   * @type {!angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  const vector = new olLayerVector({
    source: new olSourceVector({
      wrapX: false,
      features: ngeoFeatures,
    }),
  });

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
      vector,
    ],
    view: new olView({
      center: [0, 0],
      zoom: 3,
    }),
  });

  /**
   * @type {boolean}
   */
  this.drawActive = false;

  const drawToolActivate = new ngeoMiscToolActivate(this, 'drawActive');
  ngeoToolActivateMgr.registerTool('mapTools', drawToolActivate, false);

  /**
   * @type {boolean}
   */
  this.dummyActive = true;

  const dummyToolActivate = new ngeoMiscToolActivate(this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, true);
}

module.controller('MainController', MainController);

export default module;
