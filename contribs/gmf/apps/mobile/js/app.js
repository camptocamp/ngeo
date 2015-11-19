goog.provide('app.MainController');

goog.require('app');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.ScaleLine');
goog.require('ol.control.Zoom');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');



/**
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @constructor
 * @ngInject
 * @export
 */
app.MainController = function(ngeoFeatureOverlayMgr) {

  proj4.defs('EPSG:21781',
      '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 ' +
      '+x_0=600000 +y_0=200000 +ellps=bessel ' +
      '+towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs');

  /**
   * @type {Array.<gmfx.SearchDirectiveDatasource>}
   * @export
   */
  this.searchDatasources = [{
    datasetTitle: 'From demo 2.0',
    labelKey: 'label',
    groupsKey: 'layer_name',
    groupValues: ['osm'],
    projection: 'EPSG:21781',
    url: 'http://geomapfish-demo.camptocamp.net/2.0/wsgi/fulltextsearch?' +
        'query=%QUERY'
  }];

  /**
   * @type {boolean}
   * @export
   */
  this.leftNavVisible = false;

  /**
   * @type {boolean}
   * @export
   */
  this.rightNavVisible = false;

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
    ]
  });

  ngeoFeatureOverlayMgr.init(this.map);

};


/**
 * @export
 */
app.MainController.prototype.toggleLeftNavVisibility = function() {
  this.leftNavVisible = !this.leftNavVisible;
};


/**
 * @export
 */
app.MainController.prototype.toggleRightNavVisibility = function() {
  this.rightNavVisible = !this.rightNavVisible;
};


/**
 * Hide both navigation menus.
 * @export
 */
app.MainController.prototype.hideNav = function() {
  this.leftNavVisible = this.rightNavVisible = false;
};


/**
 * @return {boolean} Return true if one of the navigation menus is visible,
 * otherwise false.
 * @export
 */
app.MainController.prototype.navIsVisible = function() {
  return this.leftNavVisible || this.rightNavVisible;
};


/**
 * @return {boolean} Return true if the left navigation menus is visible,
 * otherwise false.
 * @export
 */
app.MainController.prototype.leftNavIsVisible = function() {
  return this.leftNavVisible;
};


/**
 * @return {boolean} Return true if the right navigation menus is visible,
 * otherwise false.
 * @export
 */
app.MainController.prototype.rightNavIsVisible = function() {
  return this.rightNavVisible;
};


app.module.controller('MainController', app.MainController);
