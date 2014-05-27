


/** @const **/
var app = {};


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
  var mapquest = new ol.layer.Tile({
    source: new ol.source.MapQuest({layer: 'sat'})
  });
  mapquest.set('name', 'MapQuest');

  /** @type {ol.layer.Tile} */
  var boundaries = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'http://demo.opengeo.org/geoserver/wms',
      params: {'LAYERS': 'topp:tasmania_state_boundaries'},
      serverType: 'geoserver'
    })
  });
  boundaries.set('name', 'Boundaries');

  /** @type {ol.layer.Tile} */
  var waterBodies = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'http://demo.opengeo.org/geoserver/wms',
      params: {'LAYERS': 'topp:tasmania_water_bodies'},
      serverType: 'geoserver'
    })
  });
  waterBodies.set('name', 'Water bodies');

  /** @type {ol.layer.Tile} */
  var cities = new ol.layer.Tile({
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
      mapquest,
      boundaries,
      waterBodies,
      cities
    ],
    view: new ol.View({
      center: [16339075, -5194965],
      zoom: 7
    })
  });

  var map = this.map;

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

  var selectedLayers = this.selectedLayers;

  ngeoSyncArrays(map.getLayers().getArray(), selectedLayers, true, $scope,
      layerFilter);

  // watch any change on layers array to refresh the map
  $scope.$watchCollection(function() {
    return selectedLayers;
  }, function() {
    map.render();
  });

  /**
   * @param {ol.layer.Base} layer Layer.
   * @return {boolean} `false` if the layer shouldn't be part of the selected
   *     layers.
   */
  function layerFilter(layer) {
    return layer !== mapquest;
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
  if (!angular.isDefined(val)) {
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
