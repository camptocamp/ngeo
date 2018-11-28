/**
 * @module ngeo.interaction.MeasureAzimut
 */
import googAsserts from 'goog/asserts.js';
import ngeoInteractionDrawAzimut from 'ngeo/interaction/DrawAzimut.js';
import ngeoInteractionMeasure from 'ngeo/interaction/Measure.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import olGeomGeometryCollection from 'ol/geom/GeometryCollection.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olProjProjection from 'ol/proj/Projection.js';

/**
 * @classdesc
 * Interaction dedicated to measure length.
 *
 * See our live example: [../examples/measure.html](../examples/measure.html)
 *
 * @constructor
 * @fires ngeox.MeasureEvent
 * @extends {ngeo.interaction.Measure}
 * @param {!ngeox.unitPrefix} unitPrefixFormat The format function
 * @param {!ngeox.number} numberFormat The format function
 * @param {!ngeox.interaction.MeasureOptions=} options Options
 */
const exports = function(unitPrefixFormat, numberFormat, options = /** @type {ngeox.interaction.MeasureOptions} */({})) {

  ngeoInteractionMeasure.call(this, /** @type {ngeo.interaction.MeasureBaseOptions} */ (options));


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
  this.numberFormat = googAsserts.assert(numberFormat);

  /**
   * The format function
   * @type {ngeox.unitPrefix}
   */
  this.unitPrefixFormat = googAsserts.assert(unitPrefixFormat);

};

olUtilInherits(exports, ngeoInteractionMeasure);


/**
 * @inheritDoc
 */
exports.prototype.createDrawInteraction = function(style,
  source) {

  return new ngeoInteractionDrawAzimut({
    source,
    style
  });


};


/**
 * @inheritDoc
 */
exports.prototype.handleMeasure = function(callback) {
  const geom = googAsserts.assertInstanceof(this.sketchFeature.getGeometry(), olGeomGeometryCollection);
  const line = googAsserts.assertInstanceof(geom.getGeometries()[0], olGeomLineString);
  const output = exports.getFormattedAzimutRadius(
    line, googAsserts.assertInstanceof(this.getMap().getView().getProjection(), olProjProjection),
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
exports.getFormattedAzimutRadius = function(
  line, projection, decimals, precision, formatLength, formatAzimut) {

  let output = exports.getFormattedAzimut(line, decimals, formatAzimut);

  output += `, ${ngeoInteractionMeasure.getFormattedLength(
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
exports.getFormattedAzimut = function(line, decimals, format) {
  const azimut = exports.getAzimut(line);
  return `${format(azimut, decimals)}°`;
};


/**
 * Compute azimut from a 2 points line.
 * @param {ol.geom.LineString} line LineString.
 * @return {number} Azimut value.
 */
exports.getAzimut = function(line) {
  const coords = line.getCoordinates();
  const dx = coords[1][0] - coords[0][0];
  const dy = coords[1][1] - coords[0][1];
  const rad = Math.acos(dy / Math.sqrt(dx * dx + dy * dy));
  const factor = dx > 0 ? 1 : -1;
  return (factor * rad * 180 / Math.PI) % 360;
};


export default exports;
