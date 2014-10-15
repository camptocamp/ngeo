goog.provide('ngeo_decoratelayer_service');

goog.require('goog.asserts');
goog.require('ngeo');


/**
 * @typedef {function(ol.layer.Layer)}
 */
ngeo.DecorateLayer;


/**
 * This service provides a function that adds properties (using
 * `Object.defineProperty`) to the layer, making it possible to
 * control layer properties with ngModel.
 *
 * Example:
 * <input type="checkbox" ngModel="layer.visible" />
 */
ngeoModule.value('ngeoDecorateLayer',

    /**
     * @param {ol.layer.Layer} layer Layer to decorate.
     */
    function(layer) {
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
    });
