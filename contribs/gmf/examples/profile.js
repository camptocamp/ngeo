goog.provide('gmfapp.profile');

/** @suppress {extraRequire} */
goog.require('gmf.Permalink');
/** @suppress {extraRequire} */
goog.require('gmf.map.component');
goog.require('gmf.profile.module');
goog.require('ngeo.map.module');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Collection');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.interaction.Draw');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', [
  gmf.module.name, // Change me when gmf.Theme and other dependencies are in a module
  gmf.map.component.name,
  gmf.profile.module.name,
  ngeo.map.module.name // for ngeo.map.FeatureOverlay, perhaps remove me
]);


gmfapp.module.value(
  'gmfProfileJsonUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/profile.json');

/**
 * @param {angular.Scope} $scope Angular scope.
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
 *     manager.
 * @constructor
 * @ngInject
 */
gmfapp.MainController = function($scope, ngeoFeatureOverlayMgr) {
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
      'color': '#0404A0'
    },
    'srtm': {
      'color': '#04A004'
    }
  };

  this.profileOptions = {
    styleDefs: 'svg {background-color: #D3E5D7};'
  };

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
      projection: 'EPSG:21781',
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 3
    })
  });

  const lineStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2
    })
  });

  /**
   * @type {ol.Collection.<ol.Feature>}
   */
  const features = new ol.Collection();

  const overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(features);
  overlay.setStyle(lineStyle);


  // Initialize the feature overlay manager with the map.
  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * Draw line interaction.
   * @type {ol.interaction.Draw}
   * @export
   */
  this.drawLine = new ol.interaction.Draw({
    type: /** @type {ol.geom.GeometryType} */ ('LineString'),
    features: features
  });

  this.drawLine.setActive(false);
  this.map.addInteraction(this.drawLine);

  /**
   * Toggle activation of the draw line interaction.
   * @export
   */
  this.toggleDrawLineActive = function() {
    if (this.drawLine.getActive()) {
      this.drawLine.setActive(false);
      this.clear_();
    } else {
      this.drawLine.setActive(true);
    }
  };

  this.clear_ = function() {
    features.clear(); // For the draw overlay.
    this.profileLine = null; // To reset the profile.
  };

  this.drawLine.on('drawstart', function() {
    this.clear_();
  }, this);

  this.drawLine.on('drawend', function(e) {
    // Update the profile with the new geometry
    this.profileLine = e.feature.getGeometry();
    $scope.$digest();
  }, this);
};


gmfapp.module.controller('MainController', gmfapp.MainController);
