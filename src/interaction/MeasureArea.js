import googAsserts from 'goog/asserts.js';
import ngeoInteractionMeasure from 'ngeo/interaction/Measure.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
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
function MeasureArea(format, gettextCatalog, options = {}) {

  ngeoInteractionMeasure.call(this, /** @type {import("ngeo/interaction/MeasureBaseOptions.js").default} */ (options));


  /**
   * Message to show after the first point is clicked.
   * @type {Element}
   */
  this.continueMsg;
  if (options.continueMsg !== undefined) {
    this.continueMsg = options.continueMsg;
  } else {
    this.continueMsg = document.createElement('span');
    this.continueMsg.textContent = gettextCatalog.getString('Click to continue drawing the polygon.');
    const br = document.createElement('br');
    br.textContent = gettextCatalog.getString('Double-click or click starting point to finish.');
    this.continueMsg.appendChild(br);
  }

  /**
   * The format function
   * @type {unitPrefix}
   */
  this.format = format;

}

olUtilInherits(MeasureArea, ngeoInteractionMeasure);


/**
 * @inheritDoc
 */
MeasureArea.prototype.createDrawInteraction = function(style, source) {
  return new olInteractionDraw({
    type: /** @type {import("ol/geom/GeometryType.js").default} */ ('Polygon'),
    source: source,
    style: style
  });
};


/**
 * @inheritDoc
 */
MeasureArea.prototype.handleMeasure = function(callback) {
  const geom = googAsserts.assertInstanceof(this.sketchFeature.getGeometry(), olGeomPolygon);
  const proj = this.getMap().getView().getProjection();
  googAsserts.assert(proj);
  const output = ngeoInteractionMeasure.getFormattedArea(geom, proj, this.precision, this.format);
  const verticesCount = geom.getCoordinates()[0].length;
  let coord = null;
  if (verticesCount > 3) {
    coord = geom.getInteriorPoint().getCoordinates();
  }
  callback(output, coord);
};


export default MeasureArea;
