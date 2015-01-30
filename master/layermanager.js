


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @return {function(Array):Array}
 */
app.reverseFilter = function() {
  /**
   * @param {Array} items Array to reverse.
   * @return {Array} Reversed array.
   */
  return function(items) {
    return items.slice().reverse();
  };
};


app.module.filter('reverse', app.reverseFilter);


/**
 * @param {!ol.layer.Layer} layer Layer to decorate.
 * @param {ol.Map} map Map.
 */
app.decorateLayerService = function(layer, map) {
  Object.defineProperty(layer, 'inmap', {
    get: function() {
      return map.getLayers().getArray().indexOf(layer) >= 0;
    },
    set: function(val) {
      if (val) {
        map.addLayer(layer);
      } else {
        map.removeLayer(layer);
      }
    }
  });
};


app.module.value('decorateLayer', app.decorateLayerService);



/**
 * @param {ngeo.DecorateLayer} ngeoDecorateLayer ngeo decorate layer service.
 * @param {function(!ol.layer.Layer, ol.Map)} decorateLayer Application decorate
 *     layer service.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoDecorateLayer, decorateLayer) {
  /** @type {ol.Map} */
  var map = new ol.Map({
    view: new ol.View({
      center: [-6655.5402445057125, 6709968.258934638],
      zoom: 11
    })
  });
  this['map'] = map;

  /** @type {!ol.layer.Layer} */
  var osm = new ol.layer.Tile({
    id: 'osm',
    label: 'OSM',
    source: new ol.source.OSM()
  });
  ngeoDecorateLayer(osm);
  decorateLayer(osm, map);

  /** @type {!ol.layer.Layer} */
  var mapQuest = new ol.layer.Tile({
    id: 'mapquest',
    label: 'MapQuest',
    source: new ol.source.MapQuest({layer: 'sat'})
  });
  ngeoDecorateLayer(mapQuest);
  decorateLayer(mapQuest, map);

  /** @type {!ol.layer.Layer} */
  var stamen = new ol.layer.Tile({
    id: 'stamen',
    label: 'Stamen',
    source: new ol.source.Stamen({
      layer: 'watercolor'
    })
  });
  ngeoDecorateLayer(stamen);
  decorateLayer(stamen, map);

  this['layers'] = [osm, mapQuest, stamen];
};


app.module.controller('MainController', app.MainController);


/**
 * @return {angular.Directive} Directive Definition Object.
 */
app.layerManagerDirective = function() {
  return {
    restrict: 'A',
    scope: {
      map: '=layerManager'
    },
    controller: function() {},
    controllerAs: 'ctrl',
    bindToController: true,
    template: '<ul class="list-group">' +
        '<li class="list-group-item" ng-repeat="layer in ' +
            'ctrl.map.getLayers().getArray()' +
            ' | reverse track by layer.get(\'id\')">' +
        '<button type="button" ng-click="layer.inmap = false" ' +
            'class="btn btn-primary btn-xs badge">×</button>' +
        '<label>' +
        '<input type="checkbox" ng-model="layer.visible"  />' +
            '{{layer.get("label")}}' +
        '</label>' +
        '<input type="range" min="0" max="1" step="0.05" ' +
            'ng-model="layer.opacity" />' +
        '</li>' +
        '</ul>'
  };
};


app.module.directive('layerManager', app.layerManagerDirective);
