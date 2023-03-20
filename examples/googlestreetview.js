/**
 */

import './googlestreetview.css';
import angular from 'angular';
import olMap from 'ol/Map.js';

import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleText from 'ol/style/Text.js';
import ngeoGooglestreetviewModule from 'ngeo/googlestreetview/module.js';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoGooglestreetviewModule.name,
  ngeoMiscToolActivateMgr.name,
]);

/**
 * @param {!import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr
 *    Ngeo FeatureOverlay manager.
 * @param {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr} ngeoToolActivateMgr
 *    Ngeo ToolActivate manager service.
 * @constructor
 * @ngInject
 */
function MainController(ngeoFeatureOverlayMgr, ngeoToolActivateMgr) {
  /**
   * @type {number}
   */
  this.radius = 500;

  /**
   * @type {!import("ol/style/Style.js").default}
   */
  this.style = new olStyleStyle({
    text: new olStyleText({
      fill: new olStyleFill({color: '#279B61'}),
      font: '900 30px "Font Awesome 5 Free"',
      offsetY: -15,
      stroke: new olStyleStroke({color: '#ffffff', width: 3}),
      text: '\uf041',
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
    ],
    view: new olView({
      center: [-7910687, 6178318],
      zoom: 17,
    }),
  });

  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * @type {boolean}
   */
  this.googleStreetViewActive = true;

  const googleStreetViewToolActivate = new ngeoMiscToolActivate(this, 'googleStreetViewActive');
  ngeoToolActivateMgr.registerTool('mapTools', googleStreetViewToolActivate, true);

  /**
   * @type {boolean}
   */
  this.dummyActive = false;

  const dummyToolActivate = new ngeoMiscToolActivate(this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, false);
}

module.controller('MainController', MainController);

export default module;
