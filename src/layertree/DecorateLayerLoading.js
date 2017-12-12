goog.provide('ngeo.layertree.DecorateLayerLoading');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ol.layer.Group');
goog.require('ol.layer.Layer');
goog.require('ol.source.Image');
goog.require('ol.source.Tile');


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
 * @ngdoc service
 * @ngname ngeoDecorateLayerLoading
 * @param {ol.layer.Base} layer Layer to decorate.
 * @param {angular.Scope} $scope Scope.
 */
ngeo.layertree.DecorateLayerLoading = function(layer, $scope) {

  let source;

  /**
   * @type {Array<string>|null}
   */
  let incrementEvents = null;

  /**
   * @type {Array<string>|null}
   */
  let decrementEvents = null;

  /**
   * @function
   * @private
   */
  const incrementLoadCount_ = increment_;

  /**
   * @function
   * @private
   */
  const decrementLoadCount_ = decrement_;

  layer.set('load_count', 0, true);

  if (layer instanceof ol.layer.Group) {
    layer.getLayers().on('add', (olEvent) => {
      const newLayer = olEvent.element;
      newLayer.set('parent_group', layer);
    });
  }

  if (layer instanceof ol.layer.Layer) {
    source = layer.getSource();
    if (source === null) {
      return;
    } else if (source instanceof ol.source.Tile) {
      incrementEvents = ['tileloadstart'];
      decrementEvents = ['tileloadend', 'tileloaderror'];
    } else if (source instanceof ol.source.Image) {
      incrementEvents = ['imageloadstart'];
      decrementEvents = ['imageloadend', 'imageloaderror'];
    } else {
      goog.asserts.fail('unsupported source type');
    }

    source.on(incrementEvents, () => {
      incrementLoadCount_(layer);
      $scope.$applyAsync();
    });

    source.on(decrementEvents, () => {
      decrementLoadCount_(layer);
      $scope.$applyAsync();
    });
  }

  Object.defineProperty(layer, 'loading', {
    configurable: true,
    get: () => /** @type {number} */ (layer.get('load_count')) > 0
  });

  /**
   * @function
   * @param {ol.layer.Base} layer Layer
   * @private
   */
  function increment_(layer) {
    let load_count = /** @type {number} */ (layer.get('load_count'));
    const parent = /** @type {ol.layer.Base} */ (layer.get('parent_group'));
    layer.set('load_count', ++load_count, true);
    if (parent) {
      increment_(parent);
    }
  }

  /**
   * @function
   * @param {ol.layer.Base} layer Layer
   * @private
   */
  function decrement_(layer) {
    let load_count = /** @type {number} */ (layer.get('load_count'));
    const parent = /** @type {ol.layer.Base} */ (layer.get('parent_group'));
    layer.set('load_count', --load_count, true);
    if (parent) {
      decrement_(parent);
    }
  }

};


/**
 * @type {!angular.Module}
 */
ngeo.layertree.DecorateLayerLoading.module = angular.module('ngeoDecorateLayerLoading', []);
ngeo.layertree.DecorateLayerLoading.module.value('ngeoDecorateLayerLoading', ngeo.layertree.DecorateLayerLoading);
ngeo.module.requires.push(ngeo.layertree.DecorateLayerLoading.module.name);
