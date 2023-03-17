import './createfeature.css';
import angular from 'angular';
import ngeoEditingCreatefeatureComponent from 'ngeo/editing/createfeatureComponent.js';

import ngeoGeometryType from 'ngeo/GeometryType.js';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import olCollection from 'ol/Collection.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';
import ngeoMapModule from 'ngeo/map/module.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscToolActivateMgr.name,
  ngeoEditingCreatefeatureComponent.name,
]);

/**
 * @param {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @constructor
 * @ngInject
 */
function MainController(ngeoToolActivateMgr) {
  this.features = new olCollection();

  /**
   * @type {string}
   */
  this.pointGeomType = ngeoGeometryType.POINT;

  /**
   * @type {string}
   */
  this.lineStringGeomType = ngeoGeometryType.LINE_STRING;

  /**
   * @type {string}
   */
  this.polygonGeomType = ngeoGeometryType.POLYGON;

  const vector = new olLayerVector({
    source: new olSourceVector({
      wrapX: false,
      features: this.features,
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
  this.createPointActive = false;

  const createPointToolActivate = new ngeoMiscToolActivate(this, 'createPointActive');
  ngeoToolActivateMgr.registerTool('mapTools', createPointToolActivate, false);

  /**
   * @type {boolean}
   */
  this.createLineStringActive = false;

  const createLineStringToolActivate = new ngeoMiscToolActivate(this, 'createLineStringActive');
  ngeoToolActivateMgr.registerTool('mapTools', createLineStringToolActivate, false);

  /**
   * @type {boolean}
   */
  this.createPolygonActive = false;

  const createPolygonToolActivate = new ngeoMiscToolActivate(this, 'createPolygonActive');
  ngeoToolActivateMgr.registerTool('mapTools', createPolygonToolActivate, false);

  /**
   * @type {boolean}
   */
  this.dummyActive = true;

  const dummyToolActivate = new ngeoMiscToolActivate(this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, true);
}

module.controller('MainController', MainController);

export default module;
