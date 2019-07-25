/**
 * @module app.drawfeature
 */
const exports = {};

import './drawfeature.css';
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


/** @type {!angular.Module} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoDrawModule.name,
  ngeoMapModule.name,
  ngeoMiscToolActivateMgr.module.name,
]);

/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ol.Collection.<ol.Feature>} ngeoFeatures Collection of features.
 * @param {ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @ngInject
 * @constructor
 */
exports.MainController = function($scope, ngeoFeatures, ngeoToolActivateMgr) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  const vector = new olLayerVector({
    source: new olSourceVector({
      wrapX: false,
      features: ngeoFeatures
    })
  });

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      }),
      vector
    ],
    view: new olView({
      center: [0, 0],
      zoom: 3
    })
  });

  /**
   * @type {boolean}
   * @export
   */
  this.drawActive = false;

  const drawToolActivate = new ngeoMiscToolActivate(this, 'drawActive');
  ngeoToolActivateMgr.registerTool('mapTools', drawToolActivate, false);

  /**
   * @type {boolean}
   * @export
   */
  this.dummyActive = true;

  const dummyToolActivate = new ngeoMiscToolActivate(this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, true);
};


exports.module.controller('MainController', exports.MainController);


export default exports;
