goog.provide('go_decoratelayer_service');

goog.require('go');
goog.require('goog.asserts');


/**
 * @typedef {function(ol.layer.Layer)}
 */
go.DecorateLayer;


/**
 * This service provides a function that adds properties (using
 * `Object.defineProperty`) to the passed ol.layer.Layer object
 * that can then be used with ngModel.
 */
goModule.value('goDecorateLayer',

    /**
     * @param {ol.layer.Layer} layer to decorate.
     */
    function(layer) {

      goog.asserts.assertInstanceof(layer, ol.layer.Layer);

      Object.defineProperty(layer, 'visible', {
        configurable: true,
        get: function() {
          return this.getVisible();
        },
        set: function(val) {
          this.setVisible(val);
        }
      });

      Object.defineProperty(layer, 'opacity', {
        configurable: true,
        get: function() {
          return (Math.round((this.getOpacity()) * 100) / 100) + '';
        },
        set: function(val) {
          this.setOpacity(val);
        }
      });
    });
