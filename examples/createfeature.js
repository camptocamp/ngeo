/**
 * @module app.createfeature
 */
const exports = {};

import './createfeature.css';
/** @suppress {extraRequire} */
import ngeoEditingCreatefeatureComponent from 'ngeo/editing/createfeatureComponent.js';

import ngeoGeometryType from 'ngeo/GeometryType.js';

/** @suppress {extraRequire} */
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


/** @type {!angular.Module} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscToolActivateMgr.module.name,
  ngeoEditingCreatefeatureComponent.name,
]);


/**
 * @param {ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @ngInject
 */
exports.MainController = function(ngeoToolActivateMgr) {

  /**
   * @type {ol.Collection}
   * @export
   */
  this.features = new olCollection();

  /**
   * @type {string}
   * @export
   */
  this.pointGeomType = ngeoGeometryType.POINT;

  /**
   * @type {string}
   * @export
   */
  this.lineStringGeomType = ngeoGeometryType.LINE_STRING;

  /**
   * @type {string}
   * @export
   */
  this.polygonGeomType = ngeoGeometryType.POLYGON;

  const vector = new olLayerVector({
    source: new olSourceVector({
      wrapX: false,
      features: this.features
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
  this.createPointActive = false;

  const createPointToolActivate = new ngeoMiscToolActivate(
    this,
    'createPointActive'
  );
  ngeoToolActivateMgr.registerTool(
    'mapTools',
    createPointToolActivate,
    false
  );

  /**
   * @type {boolean}
   * @export
   */
  this.createLineStringActive = false;

  const createLineStringToolActivate = new ngeoMiscToolActivate(
    this,
    'createLineStringActive'
  );
  ngeoToolActivateMgr.registerTool(
    'mapTools',
    createLineStringToolActivate,
    false
  );

  /**
   * @type {boolean}
   * @export
   */
  this.createPolygonActive = false;

  const createPolygonToolActivate = new ngeoMiscToolActivate(
    this,
    'createPolygonActive'
  );
  ngeoToolActivateMgr.registerTool(
    'mapTools',
    createPolygonToolActivate,
    false
  );

  /**
   * @type {boolean}
   * @export
   */
  this.dummyActive = true;

  const dummyToolActivate = new ngeoMiscToolActivate(
    this,
    'dummyActive'
  );
  ngeoToolActivateMgr.registerTool(
    'mapTools',
    dummyToolActivate,
    true
  );
};


exports.module.controller('MainController', exports.MainController);


export default exports;
