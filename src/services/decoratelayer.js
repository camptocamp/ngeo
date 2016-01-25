goog.provide('ngeo.DecorateLayer');

goog.require('goog.asserts');
goog.require('ngeo');


/**
 * Provides a function that adds properties (using
 * `Object.defineProperty`) to the layer, making it possible to control layer
 * properties with ngModel.
 *
 * @example
 * <input type="checkbox" ngModel="layer.visible" />
 *
 * @typedef {function(ol.layer.Layer)}
 * @ngdoc service
 * @ngname ngeoDecorateLayer
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
          return layer.getVisible();
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
          return (Math.round(layer.getOpacity() * 100) / 100) + '';
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


ngeo.module.value('ngeoDecorateLayer', ngeo.decorateLayer);
