goog.provide('ngeo.misc.decorate');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ol.interaction.Interaction');
goog.require('ol.layer.Base');
goog.require('ol.layer.Group');
goog.require('ol.layer.Layer');
goog.require('ol.source.Image');
goog.require('ol.source.Tile');


/**
 * Provides a function that adds an "active" property (using
 * `Object.defineProperty`) to an interaction, making it possible to use ngModel
 * to activate/deactivate interactions.
 *
 * Example:
 *
 *      <input type="checkbox" ngModel="interaction.active" />
 *
 * See our live example: [../examples/interactiontoggle.html](../examples/interactiontoggle.html)
 *
 * @param {ol.interaction.Interaction} interaction Interaction to decorate.
 */
ngeo.misc.decorate.interaction = function(interaction) {
  goog.asserts.assertInstanceof(interaction, ol.interaction.Interaction);

  Object.defineProperty(interaction, 'active', {
    get: () => interaction.getActive(),
    set: (val) => {
      interaction.setActive(val);
    }
  });
};


/**
 * Provides a function that adds properties (using
 * `Object.defineProperty`) to the layer, making it possible to control layer
 * properties with ngModel.
 *
 * Example:
 *
 *      <input type="checkbox" ngModel="layer.visible" />
 *
 * @param {ol.layer.Base} layer Layer to decorate.
 */
ngeo.misc.decorate.layer = function(layer) {
  goog.asserts.assertInstanceof(layer, ol.layer.Base);

  Object.defineProperty(layer, 'visible', {
    configurable: true,
    /**
     * @return {boolean} Visible.
     */
    get: () => layer.getVisible(),
    /**
     * @param {boolean} val Visible.
     */
    set: (val) => {
      layer.setVisible(val);
    }
  });

  Object.defineProperty(layer, 'opacity', {
    configurable: true,
    /**
     * @return {number} Opacity.
     */
    get: () => layer.getOpacity(),
    /**
     * @param {number} val Opacity.
     */
    set: (val) => {
      layer.setOpacity(val);
    }
  });
};


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
 * @param {ol.layer.Base} layer layer.
 * @param {angular.Scope} $scope Scope.
 */
ngeo.misc.decorate.layerLoading = function(layer, $scope) {

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
