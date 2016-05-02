goog.provide('ngeo.DecorateLayerLoading');

goog.require('goog.asserts');
goog.require('ngeo');


/**
 * Provides a function that adds a 'loading 'property (using
 * `Object.defineProperty`) to an ol.layer.Group or a layer with
 * an ol.source.Tile or an ol.source.Image source.
 * This property is true when the layer is loading and false otherwise.
 *
 * Example:
 *
 *      <span ng-if="layer.loading">please wait</span>
 *
 * @typedef {function(ol.layer.Base, angular.Scope)}
 * @ngdoc service
 * @ngname ngeoDecorateLayerLoading
 */
ngeo.DecorateLayerLoading;


/**
 * @param {ol.layer.Base} layer Layer to decorate.
 * @param {angular.Scope} $scope Scope.
 */
ngeo.decorateLayerLoading = function(layer, $scope) {
  goog.asserts.assertInstanceof(layer, ol.layer.Base);

  var sources = [];
  if (layer instanceof ol.layer.Group) {
    // layer group
    sources = layer.getLayersArray().map(function(layer) {
      goog.asserts.assert(layer instanceof ol.layer.Layer);
      return layer.getSource();
    });
  } else {
    goog.asserts.assert(layer instanceof ol.layer.Layer);
    sources = [layer.getSource()];
  }

  layer.set('load_count', 0, true);
  sources.forEach(function(source) {
    var incrementEvents, decrementEvents;
    if (source instanceof ol.source.Tile) {
      incrementEvents = ['tileloadstart'];
      decrementEvents = ['tileloadend', 'tileloaderror'];
    } else if (source instanceof ol.source.Image) {
      incrementEvents = ['imageloadstart'];
      decrementEvents = ['imageloadend', 'imageloaderror'];
    } else {
      goog.asserts.fail('unsupported source type');
    }
    source.on(incrementEvents, function() {
      var load_count = /** @type {number} */ (layer.get('load_count'));
      layer.set('load_count', ++load_count, true);
      $scope.$applyAsync();
    });
    source.on(decrementEvents, function() {
      var load_count = /** @type {number} */ (layer.get('load_count'));
      layer.set('load_count', --load_count, true);
      $scope.$applyAsync();
    });

  });

  Object.defineProperty(layer, 'loading', {
    configurable: true,
    get:
        /**
         * @return {boolean} Loading.
         */
        function() {
          return /** @type {number} */ (layer.get('load_count')) > 0;
        }
  });

};


ngeo.module.value('ngeoDecorateLayerLoading', ngeo.decorateLayerLoading);
