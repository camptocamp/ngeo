goog.provide('ngeo.misc.decorate');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ol.interaction.Interaction');


/**
 * Provides a function that adds an "active" property (using
 * `Object.defineProperty`) to an interaction, making it possible to use ngModel
 * to activate/deactivate interactions.
 *
 * Example:
 *
 *      <input type="checkbox" ngModel="interaction.active" />
 *
 * See our live example: [../examples/interactiontoggle.html](../examples/interactiontoggle.html)
 *
 * @param {ol.interaction.Interaction} interaction Interaction to decorate.
 */
ngeo.misc.decorate.interaction = function(interaction) {
  goog.asserts.assertInstanceof(interaction, ol.interaction.Interaction);

  Object.defineProperty(interaction, 'active', {
    get: () => interaction.getActive(),
    set: (val) => {
      interaction.setActive(val);
    }
  });
};
