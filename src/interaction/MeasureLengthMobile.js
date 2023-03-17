import ngeoInteractionMeasureLength from 'ngeo/interaction/MeasureLength.js';
import ngeoInteractionMobileDraw from 'ngeo/interaction/MobileDraw.js';

/**
 * Interaction dedicated to measure length on mobile devices.
 * @hidden
 */
export default class extends ngeoInteractionMeasureLength {
  /**
   * @param {!import('ngeo/misc/filters.js').unitPrefix} format The format function
   * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('ngeo/interaction/Measure.js').MeasureOptions=} opt_options Options
   */
  constructor(format, gettextCatalog, opt_options) {
    const options = opt_options !== undefined ? opt_options : {};

    Object.assign(options, {displayHelpTooltip: false});

    super(format, gettextCatalog, options);
  }

  /**
   * @param {import("ol/style/Style.js").StyleLike|undefined}
   *     style The sketchStyle used for the drawing interaction.
   * @param {import("ol/source/Vector.js").default} source Vector source.
   * @return {ngeoInteractionMobileDraw} The interaction
   */
  createDrawInteraction(style, source) {
    return new ngeoInteractionMobileDraw({
      type: 'LineString',
      style: style,
      source: source,
    });
  }
}
