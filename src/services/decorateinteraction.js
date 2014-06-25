goog.provide('go_decorateinteraction_service');

goog.require('go');
goog.require('goog.asserts');


/**
 * @typedef {function(ol.interaction.Interaction, ol.Map)}
 */
go.DecorateInteraction;


/**
 * This service provides a function that adds an "active" property (using
 * `Object.defineProperty`) to the interaction, making it possible to
 * use ngModel to activate/deactivate interactions.
 *
 * Example:
 * <input type="checkbox" ngModel="interaction.active" />
 */
goModule.value('goDecorateInteraction',

    /**
     * @param {ol.interaction.Interaction} interaction Interaction to decorate.
     * @param {ol.Map} map Map.
     */
    function(interaction, map) {
      goog.asserts.assertInstanceof(interaction, ol.interaction.Interaction);

      Object.defineProperty(interaction, 'active', {
        get: function() {
          return map.getInteractions().getArray().indexOf(interaction) >= 0;
        },
        set: function(val) {
          if (val) {
            map.addInteraction(interaction);
          } else {
            map.removeInteraction(interaction);
          }
        }
      });
    });
