


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.value(
    'gmfProfileJsonUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/profile.json');

app.module.value(
    'gmfProfileCsvUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/profile.csv');

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
      projection: projection,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 3
    })
  });

  var lineStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2
    })
  });

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  var features = new ol.Collection();

  var overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  overlay.setFeatures(features);
  overlay.setStyle(lineStyle);


  // Initialize the feature overlay manager with the map.
  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * Draw line interaction.
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


app.module.controller('MainController', app.MainController);
