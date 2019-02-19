import ngeoInteractionMeasureArea from 'ngeo/interaction/MeasureArea.js';
import ngeoInteractionMobileDraw from 'ngeo/interaction/MobileDraw.js';

/**
 * @classdesc
 * Interaction dedicated to measure Area on mobile devices.
 *
 * @constructor
 * @param {!import('ngeo/misc/filters.js').unitPrefix} format The format function
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {import('ngeo/interaction/Measure.js').MeasureOptions=} options Options
 * @private
 * @hidden
 */
class MeasureAreaMobile extends ngeoInteractionMeasureArea {
  constructor(format, gettextCatalog, options = {}) {
    Object.assign(options, {displayHelpTooltip: false});
    super(format, gettextCatalog, options);
  }

  /**
   * @param {import("ol/style/Style.js").StyleLike|undefined} style The sketchStyle used for the drawing
   *    interaction.
   * @param {import("ol/source/Vector.js").default} source Vector source.
   * @return {ngeoInteractionMobileDraw} The interaction
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
