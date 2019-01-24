import ngeoInteractionMeasureArea from 'ngeo/interaction/MeasureArea.js';
import ngeoInteractionMobileDraw from 'ngeo/interaction/MobileDraw.js';

/**
 * @classdesc
 * Interaction dedicated to measure Area on mobile devices.
 *
 * @constructor
 * @extends {import("ngeo/interaction/MeasureArea.js").default}
 * @param {!unitPrefix} format The format function
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {MeasureOptions=} options Options
 */
class MeasureAreaMobile extends ngeoInteractionMeasureArea {
  constructor(format, gettextCatalog, options = {}) {
    Object.assign(options, {displayHelpTooltip: false});
    super(format, gettextCatalog, options);
  }

  /**
   * @inheritDoc
   */
  createDrawInteraction(style, source) {
    return new ngeoInteractionMobileDraw({
      type: /** @type {import("ol/geom/GeometryType.js").default} */ ('Polygon'),
      style: style,
      source: source,
    });
  }
}

export default MeasureAreaMobile;
