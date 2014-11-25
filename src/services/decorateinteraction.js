/**
 * @fileoverview Provides a function that adds an "active" property (using
 * `Object.defineProperty`) to an interaction, making it possible to use ngModel
 * to activate/deactivate interactions.
 *
 * Example:
 * <input type="checkbox" ngModel="interaction.active" />
 */

goog.provide('ngeo.DecorateInteraction');

goog.require('goog.asserts');
goog.require('ngeo');


/**
 * @typedef {function(ol.interaction.Interaction)}
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


ngeoModule.value('ngeoDecorateInteraction', ngeo.decorateInteraction);
