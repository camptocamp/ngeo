/**
 */

import angular from 'angular';
import './drawfeature.css';
import 'jquery-ui/ui/widgets/tooltip.js';
import gmfMapComponent from 'gmf/map/component.js';

import gmfDrawingModule from 'gmf/drawing/module.js';
import googAsserts from 'goog/asserts.js';
import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfDrawingModule.name,
  gmfMapComponent.name,
  ngeoMapModule.name, // for ngeo.map.FeatureOverlay, perhaps remove me
  ngeoMiscFeatureHelper.name,
  ngeoMiscToolActivateMgr.name,
]);


exports.module.value('ngeoExportFeatureFormats', [
  ngeoMiscFeatureHelper.FormatType.KML,
  ngeoMiscFeatureHelper.FormatType.GPX
]);

exports.module.constant('defaultTheme', 'Demo');
exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @param {!angular.IScope} $scope Angular scope.
 * @param {import("ngeo/misc/FeatureHelper.js").default} ngeoFeatureHelper Gmf feature helper service.
 * @param {import("ol/Collection.js").default.<import("ol/Feature.js").default>} ngeoFeatures Collection of features.
 * @param {import("ngeo/misc/ToolActivateMgr.js").default} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @param {import("ngeo/map/FeatureOverlayMgr.js").default} ngeoFeatureOverlayMgr Ngeo FeatureOverlay
 *     manager
 * @constructor
 * @ngInject
 */
exports.MainController = function($scope, ngeoFeatureHelper, ngeoFeatures,
  ngeoToolActivateMgr, ngeoFeatureOverlayMgr) {

  /**
   * @type {!angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  const view = new olView({
    center: [0, 0],
    zoom: 3
  });

  ngeoFeatureHelper.setProjection(googAsserts.assert(view.getProjection()));

  const featureOverlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  featureOverlay.setFeatures(ngeoFeatures);

  /**
   * @type {import("ol/Map.js").default}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      })
    ],
    view: view
  });

  /**
   * @type {boolean}
   * @export
   */
  this.drawFeatureActive = true;

  const drawFeatureToolActivate = new ngeoMiscToolActivate(
    this, 'drawFeatureActive');
  ngeoToolActivateMgr.registerTool(
    'mapTools', drawFeatureToolActivate, true);

  /**
   * @type {boolean}
   * @export
   */
  this.pointerMoveActive = false;

  const pointerMoveToolActivate = new ngeoMiscToolActivate(
    this, 'pointerMoveActive');
  ngeoToolActivateMgr.registerTool(
    'mapTools', pointerMoveToolActivate, false);

  $scope.$watch(
    () => this.pointerMoveActive,
    (newVal) => {
      if (newVal) {
        this.map.on('pointermove', this.handleMapPointerMove_, this);
      } else {
        this.map.un('pointermove', this.handleMapPointerMove_, this);
        $('#pointermove-feature').html('');
      }
    }
  );

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });
};


/**
 * @param {import("ol/MapBrowserEvent.js").default} evt MapBrowser event
 * @private
 */
exports.MainController.prototype.handleMapPointerMove_ = function(evt) {
  const pixel = evt.pixel;

  const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);

  $('#pointermove-feature').html(
    (feature) ? feature.get(ngeoFormatFeatureProperties.NAME) : 'None'
  );

  this.scope_.$apply();
};


exports.module.controller('MainController', exports.MainController);


export default exports;
