goog.provide('gmf-profile');

goog.require('ngeo.FeatureOverlayMgr');
goog.require('gmf.mapDirective');
goog.require('gmf.profileDirective');
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.geom.Point');
goog.require('ol.interaction.Draw');
goog.require('ol.layer.Tile');
goog.require('ol.proj');
goog.require('ol.source.OSM');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.constant(
    'gmfProfileUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/profile.json');


/**
 * @param {angular.Scope} $scope Angular scope.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @constructor
 * @ngInject
 */
app.MainController = function($scope, ngeoFeatureOverlayMgr) {

  var projection = ol.proj.get('EPSG:21781');

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
      projection: projection,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 3
    })
  });

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  var features = new ol.Collection();

  var overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(features);
  overlay.setStyle(new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  }));

  // initialize the feature overlay manager with the map
  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * @type {ol.geom.LineString}
   * @export
   */
  this.profileLine = null;

  /**
   * @type {Object.<string, gmfx.ProfileLineConfiguration>}
   * @export
   */
  this.profileLinesconfiguration = {
    'aster': {
      'color':'#0404A0'
    },
    'srtm': {
      'color':'#04A004'
    }
  };

  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawLine = new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'LineString',
        features: features
      }));

  this.drawLine.setActive(false);
  this.map.addInteraction(this.drawLine);

  this.clear_ = function() {
    features.clear();
    this.profileLine = null;
  };

  this.toggleDrawLineActive = function() {
    if (this.drawLine.getActive()) {
      this.drawLine.setActive(false);
      this.clear_();
    } else {
      this.drawLine.setActive(true);
    }
  };

  this.drawLine.on('drawstart', function() {
    this.clear_();
  }, this);

  this.drawLine.on('drawend', function(e) {
    this.profileLine = e.feature.getGeometry();
    $scope.$digest();
  }, this);
};


app.module.controller('MainController', app.MainController);
