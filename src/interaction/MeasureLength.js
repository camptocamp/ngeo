import ngeoInteractionMeasure, {getFormattedLength} from 'ngeo/interaction/Measure.js';
import olInteractionDraw from 'ol/interaction/Draw.js';


/**
 * Interaction dedicated to measure length.
 *
 * See our live example: [../examples/measure.html](../examples/measure.html)
 */
export default class extends ngeoInteractionMeasure {
  /**
   * @param {!import('ngeo/misc/filters.js').unitPrefix} format The format function
   * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('ngeo/interaction/Measure.js').MeasureOptions=} options Options
   */
  constructor(format, gettextCatalog, options = {}) {
    super(options);

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
     * @type {import('ngeo/misc/filters.js').unitPrefix}
     */
    this.format = format;
  }

  /**
   * @param {import("ol/style/Style.js").StyleLike|undefined} style The sketchStyle used for the drawing
   *    interaction.
   * @param {import("ol/source/Vector.js").default} source Vector source.
   * @return {olInteractionDraw|import("ngeo/interaction/MobileDraw.js").default} The interaction
   */
  createDrawInteraction(style, source) {
    return new olInteractionDraw({
      type: /** @type {import("ol/geom/GeometryType.js").default} */ ('LineString'),
      source: source,
      style: style
    });
  }

  /**
   * @inheritDoc
   */
  handleMeasure(callback) {
    const geom = /** @type {import("ol/geom/LineString.js").default} */(this.sketchFeature.getGeometry());
    const proj = this.getMap().getView().getProjection();
    console.assert(proj);
    const output = getFormattedLength(geom, proj, this.precision, this.format);
    const coord = geom.getLastCoordinate();
    callback(output, coord);
  }
}
