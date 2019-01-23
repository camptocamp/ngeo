import ngeoInteractionMeasureLength from 'ngeo/interaction/MeasureLength.js';
import ngeoInteractionMobileDraw from 'ngeo/interaction/MobileDraw.js';

/**
 * Interaction dedicated to measure length on mobile devices.
 */
export default class extends ngeoInteractionMeasureLength {
  /**
   * @param {!unitPrefix} format The format function
   * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {MeasureOptions=} opt_options Options
   */
  constructor(format, gettextCatalog, opt_options) {
    const options = opt_options !== undefined ? opt_options : {};

    Object.assign(options, {displayHelpTooltip: false});

    super(format, gettextCatalog, options);
  }

  /**
   * @inheritDoc
   */
  createDrawInteraction(style, source) {
    return new ngeoInteractionMobileDraw({
      type: /** @type {import("ol/geom/GeometryType.js").default} */ ('LineString'),
      style: style,
      source: source
    });
  }
}
