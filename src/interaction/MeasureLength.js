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
 * @extends {import("ngeo/interaction/Measure.js").default}
 * @param {!unitPrefix} format The format function
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {MeasureOptions=} options Options
 */
function MeasureLength(format, gettextCatalog, options = /** @type {MeasureOptions} */({})) {

  ngeoInteractionMeasure.call(this, /** @type {import("ngeo/interaction/MeasureBaseOptions.js").default} */ (options));


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
   * @type {unitPrefix}
   */
  this.format = format;

}

olUtilInherits(MeasureLength, ngeoInteractionMeasure);


/**
 * @inheritDoc
 */
MeasureLength.prototype.createDrawInteraction = function(style, source) {
  return new olInteractionDraw({
    type: /** @type {import("ol/geom/GeometryType.js").default} */ ('LineString'),
    source: source,
    style: style
  });
};


/**
 * @inheritDoc
 */
MeasureLength.prototype.handleMeasure = function(callback) {
  const geom = googAsserts.assertInstanceof(this.sketchFeature.getGeometry(), olGeomLineString);
  const proj = this.getMap().getView().getProjection();
  googAsserts.assert(proj);
  const output = ngeoInteractionMeasure.getFormattedLength(geom, proj, this.precision, this.format);
  const coord = geom.getLastCoordinate();
  callback(output, coord);
};


export default MeasureLength;
