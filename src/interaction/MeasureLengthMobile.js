/**
 * @module ngeo.interaction.MeasureLengthMobile
 */
import ngeoInteractionMeasureLength from 'ngeo/interaction/MeasureLength.js';
import ngeoInteractionMobileDraw from 'ngeo/interaction/MobileDraw.js';
import * as olBase from 'ol/index.js';
import * as olObj from 'ol/obj.js';

/**
 * @classdesc
 * Interaction dedicated to measure length on mobile devices.
 *
 * @constructor
 * @struct
 * @extends {ngeo.interaction.MeasureLength}
 * @param {!ngeox.unitPrefix} format The format function
 * @param {!angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeox.interaction.MeasureOptions=} opt_options Options
 */
const exports = function(format, gettextCatalog, opt_options) {

  const options = opt_options !== undefined ? opt_options : {};

  olObj.assign(options, {displayHelpTooltip: false});

  ngeoInteractionMeasureLength.call(this, format, gettextCatalog, options);

};

olBase.inherits(
  exports, ngeoInteractionMeasureLength);


/**
 * @inheritDoc
 */
exports.prototype.createDrawInteraction = function(style, source) {
  return new ngeoInteractionMobileDraw({
    type: /** @type {ol.geom.GeometryType} */ ('LineString'),
    style: style,
    source: source
  });
};


export default exports;
