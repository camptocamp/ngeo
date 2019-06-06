import ngeoInteractionMeasure, {getFormattedArea} from 'ngeo/interaction/Measure.js';
import olInteractionDraw from 'ol/interaction/Draw.js';
import Polygon from 'ol/geom/Polygon.js';


/**
 * Interaction dedicated to measure length.
 *
 * See our live example: [../examples/measure.html](../examples/measure.html)
 */
export default class extends ngeoInteractionMeasure {
  /**
   * @param {import('ngeo/misc/filters.js').unitPrefix} format The format function
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('ngeo/interaction/Measure.js').MeasureOptions=} options Options
   */
  constructor(format, gettextCatalog, options = {}) {
    super(options);

    let continueMsg;
    if (options.continueMsg !== undefined) {
      continueMsg = options.continueMsg;
    } else {
      continueMsg = document.createElement('span');
      continueMsg.textContent = gettextCatalog.getString('Click to continue drawing the polygon.');
      const br = document.createElement('br');
      br.textContent = gettextCatalog.getString('Double-click or click starting point to finish.');
      continueMsg.appendChild(br);
    }
    /**
     * Message to show after the first point is clicked.
     * @type {Element}
     */
    this.continueMsg = continueMsg;

    /**
     * The format function
     * @type {import('ngeo/misc/filters.js').unitPrefix}
     */
    this.format = format;
  }

  /**
   * @param {import("ol/style/Style.js").StyleLike} style The sketchStyle used for the drawing
   *    interaction.
   * @param {import("ol/source/Vector.js").default<import("ol/geom/Polygon.js").default>} source Vector source.
   * @return {olInteractionDraw|import("ngeo/interaction/MobileDraw.js").default} The interaction
   */
  createDrawInteraction(style, source) {
    return new olInteractionDraw({
      type: 'Polygon',
      source: source,
      style: style
    });
  }

  /**
   * @param {function(string, ?import("ol/coordinate.js").Coordinate): void} callback The function
   *     to be called.
   */
  handleMeasure(callback) {
    if (!this.sketchFeature) {
      throw new Error('Missing sketchFeature');
    }
    const geom = this.sketchFeature.getGeometry();
    if (!(geom instanceof Polygon)) {
      throw new Error('Missing geometry');
    }
    const proj = this.getMap().getView().getProjection();
    console.assert(proj);
    const output = getFormattedArea(geom, proj, this.precision, this.format);
    const verticesCount = geom.getCoordinates()[0].length;
    let coord = null;
    if (verticesCount > 3) {
      coord = geom.getInteriorPoint().getCoordinates();
    }
    callback(output, coord);
  }
}
