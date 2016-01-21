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
goog.require('ol.interaction');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


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
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {string} fulltextsearchUrl url to a gmf fulltextsearch service.
 * @constructor
 * @ngInject
 * @export
 */
gmf.AbstractDesktopController = function(
    ngeoFeatureOverlayMgr, fulltextsearchUrl) {

  /**
   * @type {Array.<gmfx.SearchDirectiveDatasource>}
   * @export
   */
  this.searchDatasources = [{
    datasetTitle: 'Internal',
    labelKey: 'label',
    groupsKey: 'layer_name',
    groupValues: ['osm'],
    projection: 'EPSG:21781',
    url: fulltextsearchUrl
  }];

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
    view: new ol.View({
      center: [0, 0],
      zoom: 2
    }),
    controls: [
      new ol.control.ScaleLine(),
      new ol.control.Zoom()
    ],
    interactions: ol.interaction.defaults({
      pinchRotate: false,
      altShiftDragRotate: false
    })
  });

  /**
   * @type {boolean}
   * @export
   */
  this.toolsActive = false;

  ngeoFeatureOverlayMgr.init(this.map);

};


gmfModule.controller('AbstractDesktopController',
    gmf.AbstractDesktopController);
