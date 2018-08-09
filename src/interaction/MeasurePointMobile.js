/**
 * @module ngeo.interaction.MeasurePointMobile
 */
import googAsserts from 'goog/asserts.js';
import ngeoInteractionMeasure from 'ngeo/interaction/Measure.js';
import ngeoInteractionMobileDraw from 'ngeo/interaction/MobileDraw.js';
import * as olBase from 'ol/index.js';
import * as olObj from 'ol/obj.js';
import olGeomPoint from 'ol/geom/Point.js';

/**
 * @classdesc
 * Interaction dedicated to measure by coordinate (point) on mobile devices.
 *
 * @constructor
 * @struct
 * @extends {ngeo.interaction.Measure}
 * @param {ngeox.numberCoordinates} format the number formatter
 * @param {string} coordFormat the coordinates formatter
 * @param {ngeox.interaction.MeasureOptions=} options Options
 */
const exports = function(format, coordFormat, options = /** @type {ngeox.interaction.MeasureOptions} */ ({})) {

  olObj.assign(options, {displayHelpTooltip: false});

  ngeoInteractionMeasure.call(this, /** @type {ngeo.interaction.MeasureBaseOptions} */(options));

  /**
   * @type {ngeox.numberCoordinates}
   * @private
   */
  this.format_ = format;

  /**
   * @type {string}
   * @private
   */
  this.coordFormat_ = coordFormat;
};

olBase.inherits(exports, ngeoInteractionMeasure);


/**
 * @inheritDoc
 */
exports.prototype.createDrawInteraction = function(style, source) {
  return new ngeoInteractionMobileDraw({
    type: /** @type {ol.geom.GeometryType} */ ('Point'),
    style: style,
    source: source
  });
};


/**
 * @inheritDoc
 */
exports.prototype.handleMeasure = function(callback) {
  const geom = googAsserts.assertInstanceof(this.sketchFeature.getGeometry(), olGeomPoint);
  const dec = this.decimals;
  const output = ngeoInteractionMeasure.getFormattedPoint(geom, dec, this.format_, this.coordFormat_);
  const coord = geom.getLastCoordinate();
  callback(output, coord);
};


export default exports;
