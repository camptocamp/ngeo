goog.provide('app.layerorder');

// webpack: import './layerorder.css';
// webpack: import './common_dependencies.js';
goog.require('ngeo.map.module');
/** @suppress {extraRequire} */
goog.require('ngeo.misc.sortableComponent');
goog.require('ngeo.misc.syncArrays');
goog.require('ngeo.source.AsitVD');
const EPSG21781 = goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.TileWMS');


/** @type {!angular.Module} **/
app.layerorder.module = angular.module('app', [
  ngeo.map.module.name,
  ngeo.misc.sortableComponent.name,
]);


/**
 * @param {angular.Scope} $scope Scope.
 * @constructor
 * @export
 * @ngInject
 */
app.layerorder.MainController = function($scope) {

  /** @type {ol.layer.Tile} */
  const asitvd = new ol.layer.Tile({
    source: new ngeo.source.AsitVD({
      layer: 'asitvd.fond_couleur'
    })
  });
  asitvd.set('name', 'asitvd');

  /** @type {ol.layer.Tile} */
  const boundaries = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'https://wms.geo.admin.ch',
      params: {'LAYERS': 'ch.swisstopo.swissboundaries3d-gemeinde-flaeche.fill'},
      serverType: 'mapserver'
    })
  });
  boundaries.set('name', 'Boundaries');

  /** @type {ol.layer.Tile} */
  const waterBodies = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'https://wms.geo.admin.ch',
      params: {'LAYERS': 'ch.swisstopo.geologie-gravimetrischer_atlas'},
      serverType: 'mapserver'
    })
  });
  waterBodies.set('name', 'Water bodies');

  /** @type {ol.layer.Tile} */
  const cities = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'https://wms.geo.admin.ch',
      params: {'LAYERS': 'ch.swisstopo.dreiecksvermaschung'},
      serverType: 'mapserver'
    })
  });
  cities.set('name', 'Cities');

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      asitvd,
      boundaries,
      waterBodies,
      cities
    ],
    view: new ol.View({
      projection: EPSG21781,
      resolutions: [1000, 500, 200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 1
    })
  });

  const map = this.map;

  /**
   * @type {ol.layer.Tile}
   * @private
   */
  this.roads_ = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'https://wms.geo.admin.ch',
      params: {'LAYERS': 'ch.bafu.laerm-strassenlaerm_tag'},
      serverType: 'mapserver'
    })
  });
  this.roads_.set('name', 'Roads');

  /**
   * @type {Array.<ol.layer.Base>}
   * @const
   * @export
   */
  this.selectedLayers = [];

  const selectedLayers = this.selectedLayers;

  ngeo.misc.syncArrays(map.getLayers().getArray(), selectedLayers, true, $scope,
    layerFilter);

  // watch any change on layers array to refresh the map
  $scope.$watchCollection(() => selectedLayers, () => {
    map.render();
  });

  /**
   * @param {ol.layer.Base} layer Layer.
   * @return {boolean} `false` if the layer shouldn't be part of the selected
   *     layers.
   */
  function layerFilter(layer) {
    return layer !== asitvd;
  }

};


/**
 * Add/remove the "Roads" layer when used as a setter, and return whether
 * the "Roads" layer is in the map when used as a getter.
 * @param {boolean|undefined} val Value.
 * @return {boolean|undefined} `true` if the "Roads" layer is in the map,
 *     `false` if the "Roads" layer is not in the map, `undefined` if the
 *     function is used as setter.
 * @export
 */
app.layerorder.MainController.prototype.toggleRoadsLayer = function(val) {
  if (val === undefined) {
    return this.map.getLayers().getArray().indexOf(this.roads_) >= 0;
  } else {
    if (val) {
      this.map.addLayer(this.roads_);
    } else {
      this.map.removeLayer(this.roads_);
    }
  }
};


app.layerorder.module.controller('MainController', app.layerorder.MainController);
