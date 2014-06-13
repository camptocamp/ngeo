goog.provide('go_decoratelayer_service');

goog.require('go');
goog.require('goog.asserts');

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
