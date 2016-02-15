goog.provide('ngeo.DecorateInteraction');

goog.require('goog.asserts');
goog.require('ngeo');


/**
 * Provides a function that adds an "active" property (using
 * `Object.defineProperty`) to an interaction, making it possible to use ngModel
 * to activate/deactivate interactions.
 *
 * @example
 * <input type="checkbox" ngModel="interaction.active" />
 *
 * @typedef {function(ol.interaction.Interaction)}
 * @ngdoc service
 * @ngname ngeoDecorateInteraction
 */
ngeo.DecorateInteraction;


/**
 * @param {ol.interaction.Interaction} interaction Interaction to decorate.
 */
ngeo.decorateInteraction = function(interaction) {
  goog.asserts.assertInstanceof(interaction, ol.interaction.Interaction);

  Object.defineProperty(interaction, 'active', {
    get: function() {
      return interaction.getActive();
    },
    set: function(val) {
      interaction.setActive(val);
    }
  });
};


ngeo.module.value('ngeoDecorateInteraction', ngeo.decorateInteraction);
