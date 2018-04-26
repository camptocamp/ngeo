/**
 * @module ngeo.misc.decorate
 */
const exports = {};
import googAsserts from 'goog/asserts.js';
import olInteractionInteraction from 'ol/interaction/Interaction.js';
import olLayerBase from 'ol/layer/Base.js';
import olLayerGroup from 'ol/layer/Group.js';
import olLayerLayer from 'ol/layer/Layer.js';
import olSourceImage from 'ol/source/Image.js';
import olSourceTile from 'ol/source/Tile.js';


/**
 * Provides a function that adds an "active" property (using
 * `Object.defineProperty`) to an interaction, making it possible to use ngModel
 * to activate/deactivate interactions.
 *
 * Example:
 *
 *      <input type="checkbox" ngModel="interaction.active" />
 *
 * @param {ol.interaction.Interaction} interaction Interaction to decorate.
 */
exports.interaction = function(interaction) {
  googAsserts.assertInstanceof(interaction, olInteractionInteraction);

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
exports.layer = function(layer) {
  googAsserts.assertInstanceof(layer, olLayerBase);

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
exports.layerLoading = function(layer, $scope) {

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

  if (layer instanceof olLayerGroup) {
    layer.getLayers().on('add', (olEvent) => {
      const newLayer = olEvent.element;
      newLayer.set('parent_group', layer);
    });
  }

  if (layer instanceof olLayerLayer) {
    source = layer.getSource();
    if (source === null) {
      return;
    } else if (source instanceof olSourceTile) {
      incrementEvents = ['tileloadstart'];
      decrementEvents = ['tileloadend', 'tileloaderror'];
    } else if (source instanceof olSourceImage) {
      incrementEvents = ['imageloadstart'];
      decrementEvents = ['imageloadend', 'imageloaderror'];
    } else {
      googAsserts.fail('unsupported source type');
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


export default exports;
