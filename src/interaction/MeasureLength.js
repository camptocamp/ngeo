/**
 * @module ngeo.interaction.MeasureLength
 */
import googAsserts from 'goog/asserts.js';
import ngeoInteractionMeasure from 'ngeo/interaction/Measure.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olInteractionDraw from 'ol/interaction/Draw.js';

/**
 * @classdesc
 * Interaction dedicated to measure length.
 *
 * See our live example: [../examples/measure.html](../examples/measure.html)
 *
 * @constructor
 * @extends {ngeo.interaction.Measure}
 * @param {!ngeox.unitPrefix} format The format function
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {ngeox.interaction.MeasureOptions=} options Options
 */
const exports = function(format, gettextCatalog, options = /** @type {ngeox.interaction.MeasureOptions} */({})) {

  ngeoInteractionMeasure.call(this, /** @type {ngeo.interaction.MeasureBaseOptions} */ (options));


  if (options.continueMsg !== undefined) {
    this.continueMsg = options.continueMsg;
  } else {
    this.continueMsg = document.createElement('span');
    this.continueMsg.textContent = gettextCatalog.getString('Click to continue drawing the line.');
    const br = document.createElement('br');
    br.textContent = gettextCatalog.getString('Double-click or click last point to finish.');
    this.continueMsg.appendChild(br);
  }

  /**
   * The format function
   * @type {ngeox.unitPrefix}
   */
  this.format = format;

};

olUtilInherits(exports, ngeoInteractionMeasure);


/**
 * @inheritDoc
 */
exports.prototype.createDrawInteraction = function(style, source) {
  return new olInteractionDraw({
    type: /** @type {ol.geom.GeometryType} */ ('LineString'),
    source: source,
    style: style
  });
};


/**
 * @inheritDoc
 */
exports.prototype.handleMeasure = function(callback) {
  const geom = googAsserts.assertInstanceof(this.sketchFeature.getGeometry(), olGeomLineString);
  const proj = this.getMap().getView().getProjection();
  googAsserts.assert(proj);
  const output = ngeoInteractionMeasure.getFormattedLength(geom, proj, this.precision, this.format);
  const coord = geom.getLastCoordinate();
  callback(output, coord);
};


export default exports;
