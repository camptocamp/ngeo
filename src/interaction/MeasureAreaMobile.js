import ngeoInteractionMeasureArea from 'ngeo/interaction/MeasureArea.js';
import ngeoInteractionMobileDraw from 'ngeo/interaction/MobileDraw.js';

/**
 * Interaction dedicated to measure Area on mobile devices.
 * @private
 * @hidden
 */
class MeasureAreaMobile extends ngeoInteractionMeasureArea {
  /**
   * @param {import('ngeo/misc/filters.js').unitPrefix} format The format function
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('ngeo/interaction/Measure.js').MeasureOptions=} options Options
   */
  constructor(format, gettextCatalog, options = {}) {
    Object.assign(options, {displayHelpTooltip: false});
    super(format, gettextCatalog, options);
  }

  /**
   * @param {import("ol/style/Style.js").StyleLike} style The sketchStyle used for the drawing
   *    interaction.
   * @param {import("ol/source/Vector.js").default<import("ol/geom/Polygon.js").default>} source Vector source.
   * @return {ngeoInteractionMobileDraw} The interaction
   */
  createDrawInteraction(style, source) {
    return new ngeoInteractionMobileDraw({
      type: 'Polygon',
      style: style,
    });
  }
}

export default MeasureAreaMobile;
