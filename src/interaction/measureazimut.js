goog.provide('ngeo.interaction.MeasureAzimut');

goog.require('goog.asserts');
goog.require('ngeo.interaction.DrawAzimut');
goog.require('ngeo.interaction.Measure');
goog.require('ol');
goog.require('ol.geom.GeometryCollection');
goog.require('ol.geom.LineString');
goog.require('ol.proj.Projection');

/**
 * @classdesc
 * Interaction dedicated to measure length.
 *
 * See our live example: [../examples/measure.html](../examples/measure.html)
 *
 * @constructor
 * @struct
 * @fires ol.interaction.Draw.Event
 * @extends {ngeo.interaction.Measure}
 * @param {!ngeox.unitPrefix} unitPrefixFormat The format function
 * @param {!ngeox.number} numberFormat The format function
 * @param {!ngeox.interaction.MeasureOptions=} options Options
 */
ngeo.interaction.MeasureAzimut = function(unitPrefixFormat, numberFormat, options = /** @type {ngeox.interaction.MeasureOptions} */({})) {

  ngeo.interaction.Measure.call(this, /** @type {ngeo.interaction.MeasureBaseOptions} */ (options));


  /**
   * Message to show after the first point is clicked.
   * @type {Element}
   */
  this.continueMsg;
  if (options.continueMsg !== undefined) {
    this.continueMsg = options.continueMsg;
  } else {
    this.continueMsg = document.createElement('span');
    this.continueMsg.textContent = 'Click to finish.';
  }

  /**
   * The format function
   * @type {ngeox.number}
   */
  this.numberFormat = goog.asserts.assert(numberFormat);

  /**
   * The format function
   * @type {ngeox.unitPrefix}
   */
  this.unitPrefixFormat = goog.asserts.assert(unitPrefixFormat);

};
ol.inherits(ngeo.interaction.MeasureAzimut, ngeo.interaction.Measure);


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureAzimut.prototype.createDrawInteraction = function(style,
  source) {

  return new ngeo.interaction.DrawAzimut({
    source,
    style
  });


};


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureAzimut.prototype.handleMeasure = function(callback) {
  const geom = goog.asserts.assertInstanceof(this.sketchFeature.getGeometry(), ol.geom.GeometryCollection);
  const line = goog.asserts.assertInstanceof(geom.getGeometries()[0], ol.geom.LineString);
  const output = ngeo.interaction.MeasureAzimut.getFormattedAzimutRadius(
    line, goog.asserts.assertInstanceof(this.getMap().getView().getProjection(), ol.proj.Projection),
    this.decimals, this.precision, this.unitPrefixFormat, this.numberFormat);
  callback(output, line.getLastCoordinate());
};


/**
 * Format measure output of azimut and radius.
 * @param {!ol.geom.LineString} line LineString.
 * @param {!ol.proj.Projection} projection Projection of the polygon coords.
 * @param {number|undefined} decimals Decimals.
 * @param {number|undefined} precision Precision.
 * @param {!ngeox.unitPrefix} formatLength The format function.
 * @param {!ngeox.number} formatAzimut The format function.
 * @return {string} Formatted measure.
 */
ngeo.interaction.MeasureAzimut.getFormattedAzimutRadius = function(
  line, projection, decimals, precision, formatLength, formatAzimut) {

  let output = ngeo.interaction.MeasureAzimut.getFormattedAzimut(line, decimals, formatAzimut);

  output += `, ${ngeo.interaction.Measure.getFormattedLength(
    line, projection, precision, formatLength)}`;

  return output;
};


/**
 * Format measure output of azimut.
 * @param {!ol.geom.LineString} line LineString.
 * @param {number|undefined} decimals Decimals.
 * @param {!ngeox.number} format The format function.
 * @return {string} Formatted measure.
 */
ngeo.interaction.MeasureAzimut.getFormattedAzimut = function(line, decimals, format) {
  const azimut = ngeo.interaction.MeasureAzimut.getAzimut(line);
  return `${format(azimut, decimals)}°`;
};


/**
 * Compute azimut from a 2 points line.
 * @param {ol.geom.LineString} line LineString.
 * @return {number} Azimut value.
 */
ngeo.interaction.MeasureAzimut.getAzimut = function(line) {
  const coords = line.getCoordinates();
  const dx = coords[1][0] - coords[0][0];
  const dy = coords[1][1] - coords[0][1];
  const rad = Math.acos(dy / Math.sqrt(dx * dx + dy * dy));
  const factor = dx > 0 ? 1 : -1;
  return (factor * rad * 180 / Math.PI) % 360;
};
