/**
 * @fileoverview This example shows how to create a layer catalog tree with
 * checkboxes for controlling the addition/removal of layers to/from the map.
 */




/** @const */
var app = {};


/** @type {!angular.Module} */
app.module = angular.module('app', ['ngeo']);


/**
 * A function that returns a layer for a type. A cache is used, so
 * always the same layer instance is returned for a given type.
 * @param {string} type Layer type.
 * @return {ol.layer.Layer} Layer.
 */
app.getLayer = (function() {
  /**
   * @type {Object.<string, ol.layer.Layer>}
   */
  var layerCache = {};
  return (
      /**
       * @param {string} type Layer type.
       * @return {ol.layer.Layer} Layer.
       */
      function(type) {
        if (type in layerCache) {
          return layerCache[type];
        }
        var source;
        if (type == 'stamenWatercolor') {
          source = new ol.source.Stamen({
            layer: 'watercolor'
          });
        } else if (type == 'stamenTerrain-labels') {
          source = new ol.source.Stamen({
            layer: 'terrain-labels'
          });
        } else if (type == 'mapquestOsm') {
          source = new ol.source.MapQuest({
            layer: 'osm'
          });
        } else if (type == 'mapquestSat') {
          source = new ol.source.MapQuest({
            layer: 'sat'
          });
        } else if (type == 'mapquestHyb') {
          source = new ol.source.MapQuest({
            layer: 'hyb'
          });
        } else {
          source = new ol.source.OSM();
        }
        var layer = new ol.layer.Tile({
          source: source
        });
        layerCache[type] = layer;
        return layer;
      });
})();


app.module.value('appGetLayer', app.getLayer);


/**
 * Function returning the Directive Definition Object for the "catalog"
 * directive.
 *
 * Example usage:
 *
 * <app-catalog app-catalog-map="map"></app-catalog>
 *
 * @return {angular.Directive} The Directive Definition Object.
 */
app.catalogDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'map': '=appCatalogMap'
    },
    templateUrl: 'partials/catalog.html',
    controller: 'AppCatalogController',
    controllerAs: 'ctrl',
    bindToController: true
  };
};


app.module.directive('appCatalog', app.catalogDirective);



/**
 * Controller for the "catalog" directive.
 * @param {angular.$http} $http Angular http service.
 * @constructor
 * @ngInject
 */
app.catalogDirectiveController = function($http) {
  $http.get('data/tree.json').then(angular.bind(this, function(resp) {
    this['tree'] = resp.data;
  }));
};


app.module.controller('AppCatalogController', app.catalogDirectiveController);


/**
 * Function returning the Directive Definition Object for the "catalog node"
 * directive. The catalog nodes are instances of that directive.
 *
 * @param {angular.$compile} $compile Angular compile service.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 */
app.catalogNodeDirective = function($compile) {
  return {
    restrict: 'A',
    require: '^appCatalog',
    scope: {
      'node': '=appCatalogNode',
      'map': '=appCatalogNodeMap'
    },
    templateUrl: 'partials/catalognode.html',
    controller: 'AppCatalogNodeController',
    controllerAs: 'ctrl',
    bindToController: true,
    compile:
        /**
         * @param {angular.JQLite} tElement Template element.
         * @param {angular.Attributes} tAttrs Template attributes.
         * @return {Function} Post-link function.
         */
        function(tElement, tAttrs) {
          var contents = tElement.contents().remove();
          var compiledContents;
          return (
              /**
               * Post-link function.
               * @param {angular.Scope} scope Scope.
               * @param {angular.JQLite} iElement Instance element.
               * @param {angular.Attributes} iAttrs Instance attributes.
               */
              function(scope, iElement, iAttrs) {
                if (!compiledContents) {
                  compiledContents = $compile(contents);
                }
                compiledContents(scope,
                    /**
                     * @param {Object} clone Clone element.
                     */
                    function(clone) {
                      var cloneElement = /** @type {angular.JQLite} */ (clone);
                      iElement.append(cloneElement);
                    });
              });
        }
  };
};


app.module.directive('appCatalogNode', app.catalogNodeDirective);



/**
 * The controller for the "catalog node" directive.
 * @param {function(string):ol.layer.Layer} appGetLayer Layer factory.
 * @constructor
 * @ngInject
 */
app.CatalogNodeController = function(appGetLayer) {
  /**
   * @type {ol.Map}
   */
  var map = this['map'];

  /**
   * `undefined` if the node is not a leaf.
   * @type {string|undefined}
   */
  var layerType = this['node']['layerType'];

  /**
   * @type {ol.layer.Layer}
   */
  var layer = angular.isDefined(layerType) ?
      appGetLayer(/** @type {string} */ (layerType)) : null;

  /**
   * @param {boolean|undefined} val Value.
   * @return {boolean|undefined} Value.
   */
  this['getSetMap'] = function(val) {
    // goog.asserts.assert(!goog.isNull(layer));
    if (angular.isDefined(val)) {
      if (!val) {
        map.removeLayer(layer);
      } else {
        map.addLayer(layer);
      }
    } else {
      return map.getLayers().getArray().indexOf(layer) >= 0;
    }
  };
};


app.module.controller('AppCatalogNodeController', app.CatalogNodeController);



/**
 * The application's main directive.
 * @constructor
 */
app.MainController = function() {
  /** @type {ol.Map} */
  this['map'] = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: [-10983710.59086991, 4686507.078220731],
      zoom: 4
    })
  });
};


app.module.controller('MainController', app.MainController);
