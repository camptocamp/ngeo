/**
 * @module ngeo.interaction.MeasureLengthMobile
 */
import ngeoInteractionMeasureLength from 'ngeo/interaction/MeasureLength.js';
import ngeoInteractionMobileDraw from 'ngeo/interaction/MobileDraw.js';
import {inherits as olUtilInherits} from 'ol/util.js';

/**
 * @classdesc
 * Interaction dedicated to measure length on mobile devices.
 *
 * @constructor
 * @extends {ngeo.interaction.MeasureLength}
 * @param {!unitPrefix} format The format function
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {MeasureOptions=} opt_options Options
 */
const exports = function(format, gettextCatalog, opt_options) {

  const options = opt_options !== undefined ? opt_options : {};

  Object.assign(options, {displayHelpTooltip: false});

  ngeoInteractionMeasureLength.call(this, format, gettextCatalog, options);

};

olUtilInherits(
  exports, ngeoInteractionMeasureLength);


/**
 * @inheritDoc
 */
exports.prototype.createDrawInteraction = function(style, source) {
  return new ngeoInteractionMobileDraw({
    type: /** @type {import("ol/geom/GeometryType.js").default} */ ('LineString'),
    style: style,
    source: source
  });
};


export default exports;
