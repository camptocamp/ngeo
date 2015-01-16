/**
 * @fileoverview Provides a function that adds properties (using
 * `Object.defineProperty`) to the layer, making it possible to control layer
 * properties with ngModel.
 *
 * Example:
 * <input type="checkbox" ngModel="layer.visible" />
 */

goog.provide('ngeo.DecorateLayer');

goog.require('goog.asserts');
goog.require('ngeo');


/**
 * @typedef {function(ol.layer.Layer)}
 */
ngeo.DecorateLayer;


/**
 * @param {ol.layer.Layer} layer Layer to decorate.
 */
ngeo.decorateLayer = function(layer) {
  goog.asserts.assertInstanceof(layer, ol.layer.Layer);

  Object.defineProperty(layer, 'visible', {
    configurable: true,
    get:
        /**
         * @return {boolean} Visible.
         */
        function() {
          return /** @type {boolean} */ (layer.getVisible());
        },
    set:
        /**
         * @param {boolean} val Visible.
         */
        function(val) {
          layer.setVisible(val);
        }
  });

  Object.defineProperty(layer, 'opacity', {
    configurable: true,
    get:
        /**
         * @return {string} Opacity.
         */
        function() {
          var opacity = /** @type {number} */ (layer.getOpacity());
          return (Math.round(opacity * 100) / 100) + '';
        },
    set:
        /**
         * @param {string} val Opacity.
         */
        function(val) {
          layer.setOpacity(+val);
        }
  });
};


ngeoModule.value('ngeoDecorateLayer', ngeo.decorateLayer);
