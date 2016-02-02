goog.provide('gmf.AbstractDesktopController');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
/** @suppress {extraRequire} */
goog.require('gmf.proj.EPSG21781');
/** @suppress {extraRequire} */
goog.require('gmf.searchDirective');
goog.require('ngeo.FeatureOverlayMgr');
/** @suppress {extraRequire} */
goog.require('ngeo.btngroupDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.resizemapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.ScaleLine');
goog.require('ol.control.Zoom');
// TODO: Remove when we add the base layer switcher
goog.require('ol.format.WMTSCapabilities');
goog.require('ol.interaction');
// TODO: Remove when we add the base layer switcher
goog.require('ol.layer.Tile');
// TODO: Remove when we add the base layer switcher
goog.require('ol.source.WMTS');


gmfModule.constant('isDesktop', true);



/**
 * Application entry point.
 *
 * This file defines the "app_desktop" Closure namespace, which is be used as
 * the Closure entry point (see "closure_entry_point" in the "build.json" file
 * ).
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 *
 * @param {gmfx.Config} config A part of the application config.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {string} fulltextsearchUrl url to a gmf fulltextsearch service.
 * @constructor
 * @ngInject
 * @export
 */
gmf.AbstractDesktopController = function(
    config, ngeoFeatureOverlayMgr, fulltextsearchUrl) {

  /**
   * @type {Array.<gmfx.SearchDirectiveDatasource>}
   * @export
   */
  this.searchDatasources = [{
    datasetTitle: 'Internal',
    labelKey: 'label',
    groupsKey: 'layer_name',
    groupValues: ['osm'],
    projection: 'EPSG:' + (config.srid || 21781),
    url: fulltextsearchUrl
  }];

  var viewConfig = {
    projection: ol.proj.get('epsg:' + (config.srid || 21781))
  };
  goog.object.extend(viewConfig, config.mapViewConfig || {});

  // TODO: Remove when we add the base layer switcher
  var layer = new ol.layer.Tile();
  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [layer],
    view: new ol.View(viewConfig),
    controls: config.mapControls || [
      new ol.control.ScaleLine(),
      new ol.control.Zoom()
    ],
    interactions: config.mapInteractions || ol.interaction.defaults({
      pinchRotate: false,
      altShiftDragRotate: false
    })
  });

  // TODO: Remove when we add the base layer switcher
  var parser = new ol.format.WMTSCapabilities();
  $.ajax(
      'https://geomapfish-demo.camptocamp.net/2.0/tiles/1.0.0/WMTSCapabilities.xml'
  ).then(function(response) {
    var result = parser.read(response);
    var options = ol.source.WMTS.optionsFromCapabilities(result, {
      layer: 'map', requestEncoding: 'REST'
    });
    layer.setSource(new ol.source.WMTS(options));
  });

  /**
   * @type {boolean}
   * @export
   */
  this.toolsActive = false;

  ngeoFeatureOverlayMgr.init(this.map);

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body'
  });
};


gmfModule.controller(
    'AbstractDesktopController',
    gmf.AbstractDesktopController);
