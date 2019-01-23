import ngeoInteractionMeasure from 'ngeo/interaction/Measure.js';
import ngeoInteractionMobileDraw from 'ngeo/interaction/MobileDraw.js';


/**
 * Interaction dedicated to measure by coordinate (point) on mobile devices.
 */
export default class extends ngeoInteractionMeasure {
  /**
   * @param {numberCoordinates} format the number formatter
   * @param {string} coordFormat the coordinates formatter
   * @param {MeasureOptions=} options Options
   */
  constructor(format, coordFormat, options = {}) {
    Object.assign(options, {displayHelpTooltip: false});

    super(options);

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

  /**
   * @inheritDoc
   */
  createDrawInteraction(style, source) {
    return new ngeoInteractionMobileDraw({
      type: /** @type {import("ol/geom/GeometryType.js").default} */ ('Point'),
      style: style,
      source: source,
    });
  }

  /**
   * @inheritDoc
   */
  handleMeasure(callback) {
    const geom = this.sketchFeature.getGeometry();
    const dec = this.decimals;
    const output = ngeoInteractionMeasure.getFormattedPoint(geom, dec, this.format_, this.coordFormat_);
    const coord = geom.getLastCoordinate();
    callback(output, coord);
  }
}
