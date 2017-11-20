goog.provide('ngeo.interaction.MeasurePointMobile');

goog.require('ngeo.interaction.Measure');
goog.require('ngeo.interaction.MobileDraw');
goog.require('ol.geom.Point');


/**
 * @classdesc
 * Interaction dedicated to measure by coordinate (point) on mobile devices.
 *
 * @constructor
 * @struct
 * @extends {ngeo.interaction.Measure}
 * @param {ngeox.numberCoordinates} format the Formatter
 * @param {ngeox.interaction.MeasureOptions=} opt_options Options
 * @export
 */
ngeo.interaction.MeasurePointMobile = function(format, opt_options) {

  const options = opt_options !== undefined ? opt_options : {};

  ol.obj.assign(options, {displayHelpTooltip: false});

  ngeo.interaction.Measure.call(this, options);

  /**
   * @type {ngeox.numberCoordinates}
   */
  this.format_ = format;

};
ol.inherits(ngeo.interaction.MeasurePointMobile, ngeo.interaction.Measure);


/**
 * @inheritDoc
 */
ngeo.interaction.MeasurePointMobile.prototype.createDrawInteraction = function(style, source) {
  return new ngeo.interaction.MobileDraw({
    type: /** @type {ol.geom.GeometryType} */ ('Point'),
    style: style,
    source: source
  });
};


/**
 * @inheritDoc
 */
ngeo.interaction.MeasurePointMobile.prototype.handleMeasure = function(callback) {
  const geom = goog.asserts.assertInstanceof(this.sketchFeature.getGeometry(), ol.geom.Point);
  const dec = this.decimals;
  const output = ngeo.interaction.Measure.getFormattedPoint(geom, dec, this.format_);
  const coord = geom.getLastCoordinate();
  callback(output, coord);
};
