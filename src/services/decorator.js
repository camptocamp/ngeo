goog.provide('go_decorator_service');

goog.require('go');
goog.require('goog.asserts');


/**
 * This service provides functions that add properties (using
 * `Object.defineProperty`) to the passed object
 * that can then be used with ngModel.
 */
goModule.value('goDecorator', {

  /**
   * @param {ol.layer.Layer} layer Layer to decorate.
   */
  layer: function(layer) {

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
  },

  /**
   * @param {ol.interaction.Interaction} interaction Interaction to decorate.
   * @param {ol.Map} map Map to bind the interaction with.
   */
  interaction: function(interaction, map) {

    goog.asserts.assertInstanceof(interaction, ol.interaction.Interaction);

    Object.defineProperty(interaction, 'active', {
      get: function() {
        var currentMap = interaction.getMap();
        goog.asserts.assert(goog.isNull(currentMap) || currentMap === map);
        return !goog.isNull(currentMap);
      },
      set: function(val) {
        if (val) {
          map.addInteraction(interaction);
        } else {
          map.removeInteraction(interaction);
        }
      }
    });
  }
});
