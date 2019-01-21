import googAsserts from 'goog/asserts.js';
import ngeoInteractionMeasure from 'ngeo/interaction/Measure.js';
import ngeoInteractionMobileDraw from 'ngeo/interaction/MobileDraw.js';
import {inherits as olUtilInherits} from 'ol/util.js';

import olGeomPoint from 'ol/geom/Point.js';

/**
 * @classdesc
 * Interaction dedicated to measure by coordinate (point) on mobile devices.
 *
 * @constructor
 * @extends {import("ngeo/interaction/Measure.js").default}
 * @param {numberCoordinates} format the number formatter
 * @param {string} coordFormat the coordinates formatter
 * @param {MeasureOptions=} options Options
 */
function MeasurePointMobile(format, coordFormat, options = /** @type {MeasureOptions} */ ({})) {

  Object.assign(options, {displayHelpTooltip: false});

  ngeoInteractionMeasure.call(this, /** @type {import("ngeo/interaction/MeasureBaseOptions.js").default} */(options));

  /**
   * @type {numberCoordinates}
   * @private
   */
  this.format_ = format;

  /**
   * @type {string}
   * @private
   */
  this.coordFormat_ = coordFormat;
}

olUtilInherits(MeasurePointMobile, ngeoInteractionMeasure);


/**
 * @inheritDoc
 */
MeasurePointMobile.prototype.createDrawInteraction = function(style, source) {
  return new ngeoInteractionMobileDraw({
    type: /** @type {import("ol/geom/GeometryType.js").default} */ ('Point'),
    style: style,
    source: source
  });
};


/**
 * @inheritDoc
 */
MeasurePointMobile.prototype.handleMeasure = function(callback) {
  const geom = googAsserts.assertInstanceof(this.sketchFeature.getGeometry(), olGeomPoint);
  const dec = this.decimals;
  const output = ngeoInteractionMeasure.getFormattedPoint(geom, dec, this.format_, this.coordFormat_);
  const coord = geom.getLastCoordinate();
  callback(output, coord);
};


export default MeasurePointMobile;
