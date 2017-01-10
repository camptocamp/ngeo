goog.provide('app.layerorder');

goog.require('ngeo.DecorateLayer');
/** @suppress {extraRequire} */
goog.require('ngeo.SortableOptions');
goog.require('ngeo.SyncArrays');
/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.sortableDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ol.source.TileWMS');


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.DecorateLayer} ngeoDecorateLayer Decorate layer service.
 * @param {ngeo.SyncArrays} ngeoSyncArrays Array sync service.
 * @constructor
 * @export
 * @ngInject
 */
app.MainController = function($scope, ngeoDecorateLayer, ngeoSyncArrays) {

  /** @type {ol.layer.Tile} */
  const osm = new ol.layer.Tile({
    source: new ol.source.OSM()
  });
  osm.set('name', 'osm');

  /** @type {ol.layer.Tile} */
  const boundaries = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'http://demo.opengeo.org/geoserver/wms',
      params: {'LAYERS': 'topp:tasmania_state_boundaries'},
      serverType: 'geoserver'
    })
  });
  boundaries.set('name', 'Boundaries');

  /** @type {ol.layer.Tile} */
  const waterBodies = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'http://demo.opengeo.org/geoserver/wms',
      params: {'LAYERS': 'topp:tasmania_water_bodies'},
      serverType: 'geoserver'
    })
  });
  waterBodies.set('name', 'Water bodies');

  /** @type {ol.layer.Tile} */
  const cities = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'http://demo.opengeo.org/geoserver/wms',
      params: {'LAYERS': 'topp:tasmania_cities'},
      serverType: 'geoserver'
    })
  });
  cities.set('name', 'Cities');

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      osm,
      boundaries,
      waterBodies,
      cities
    ],
    view: new ol.View({
      center: [16339075, -5194965],
      zoom: 7
    })
  });

  const map = this.map;

  /**
   * @type {ol.layer.Tile}
   * @private
   */
  this.roads_ = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'http://demo.opengeo.org/geoserver/wms',
      params: {'LAYERS': 'topp:tasmania_roads'},
      serverType: 'geoserver'
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

  ngeoSyncArrays(map.getLayers().getArray(), selectedLayers, true, $scope,
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
    return layer !== osm;
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
app.MainController.prototype.toggleRoadsLayer = function(val) {
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


app.module.controller('MainController', app.MainController);
