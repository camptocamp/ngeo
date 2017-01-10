goog.provide('ngeo.DecorateLayer');

goog.require('goog.asserts');
goog.require('ngeo');


/**
 * Provides a function that adds properties (using
 * `Object.defineProperty`) to the layer, making it possible to control layer
 * properties with ngModel.
 *
 * Example:
 *
 *      <input type="checkbox" ngModel="layer.visible" />
 *
 * See our live examples:
 * [../examples/layeropacity.html](../examples/layeropacity.html)
 * [../examples/layervisibility.html](../examples/layervisibility.html)
 *
 * @typedef {function(ol.layer.Base)}
 * @ngdoc service
 * @ngname ngeoDecorateLayer
 */
ngeo.DecorateLayer;


/**
 * @param {ol.layer.Base} layer Layer to decorate.
 */
ngeo.decorateLayer = function(layer) {
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
     * @return {string} Opacity.
     */
    get: () => `${Math.round(layer.getOpacity() * 100) / 100}`,
    /**
     * @param {string} val Opacity.
     */
    set: (val) => {
      layer.setOpacity(+val);
    }
  });
};


ngeo.module.value('ngeoDecorateLayer', ngeo.decorateLayer);
