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
ngeo.DecorateLayer = function(layer) {
  goog.asserts.assertInstanceof(layer, ol.layer.Layer);

  Object.defineProperty(layer, 'visible', {
    configurable: true,
    get: function() {
      return layer.getVisible();
    },
    set: function(val) {
      layer.setVisible(val);
    }
  });

  Object.defineProperty(layer, 'opacity', {
    configurable: true,
    get: function() {
      return (Math.round((layer.getOpacity()) * 100) / 100) + '';
    },
    set: function(val) {
      layer.setOpacity(val);
    }
  });
};


ngeoModule.value('ngeoDecorateLayer', ngeo.DecorateLayer);
