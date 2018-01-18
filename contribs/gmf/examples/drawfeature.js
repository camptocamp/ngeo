goog.provide('gmfapp.drawfeature');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
goog.require('gmf.drawing.module');
goog.require('ngeo.map.module');
goog.require('ngeo.misc.FeatureHelper');
goog.require('ngeo.misc.ToolActivate');
goog.require('ngeo.misc.ToolActivateMgr');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', [
  gmf.module.name, // Change me when gmf.Theme and other dependencies are in a module
  gmf.drawing.module.name,
  gmf.map.component.name,
  ngeo.map.module.name, // for ngeo.map.FeatureOverlay, perhaps remove me
  ngeo.misc.FeatureHelper.module.name,
  ngeo.misc.ToolActivateMgr.module.name,
]);


gmfapp.module.value('ngeoExportFeatureFormats', [
  ngeo.misc.FeatureHelper.FormatType.KML,
  ngeo.misc.FeatureHelper.FormatType.GPX
]);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeo.misc.FeatureHelper} ngeoFeatureHelper Gmf feature helper service.
 * @param {ol.Collection.<ol.Feature>} ngeoFeatures Collection of features.
 * @param {ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr Ngeo FeatureOverlay
 *     manager
 * @constructor
 * @ngInject
 */
gmfapp.MainController = function($scope, ngeoFeatureHelper, ngeoFeatures,
  ngeoToolActivateMgr, ngeoFeatureOverlayMgr) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  const view = new ol.View({
    center: [0, 0],
    zoom: 3
  });

  ngeoFeatureHelper.setProjection(goog.asserts.assert(view.getProjection()));

  const featureOverlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  featureOverlay.setFeatures(ngeoFeatures);

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: view
  });

  /**
   * @type {boolean}
   * @export
   */
  this.drawFeatureActive = true;

  const drawFeatureToolActivate = new ngeo.misc.ToolActivate(
    this, 'drawFeatureActive');
  ngeoToolActivateMgr.registerTool(
    'mapTools', drawFeatureToolActivate, true);

  /**
   * @type {boolean}
   * @export
   */
  this.pointerMoveActive = false;

  const pointerMoveToolActivate = new ngeo.misc.ToolActivate(
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
 * @param {ol.MapBrowserEvent} evt MapBrowser event
 * @private
 */
gmfapp.MainController.prototype.handleMapPointerMove_ = function(evt) {
  const pixel = evt.pixel;

  const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);

  $('#pointermove-feature').html(
    (feature) ? feature.get(ngeo.FeatureProperties.NAME) : 'None'
  );

  this.scope_.$apply();
};


gmfapp.module.controller('MainController', gmfapp.MainController);
