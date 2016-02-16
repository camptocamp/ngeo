goog.provide('ngeo.interaction.MeasureLengthMobile');

goog.require('ngeo.interaction.MeasureLength');
goog.require('ngeo.interaction.MobileDraw');


/**
 * @classdesc
 * Interaction dedicated to measure length on mobile devices.
 *
 * @constructor
 * @extends {ngeo.interaction.MeasureLength}
 * @param {ngeox.interaction.MeasureOptions=} opt_options Options
 * @export
 */
ngeo.interaction.MeasureLengthMobile = function(opt_options) {

  var options = goog.isDef(opt_options) ? opt_options : {};

  goog.object.extend(options, {displayHelpTooltip: false});

  goog.base(this, options);

};
goog.inherits(ngeo.interaction.MeasureLengthMobile,
              ngeo.interaction.MeasureLength);


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureLengthMobile.prototype.createDrawInteraction =
    function(style, source) {
      return new ngeo.interaction.MobileDraw({
        'type': /** @type {ol.geom.GeometryType<string>} */ ('LineString'),
        'style': style,
        'source': source
      });
    };
