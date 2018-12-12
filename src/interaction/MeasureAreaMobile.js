/**
 * @module ngeo.interaction.MeasureAreaMobile
 */
import ngeoInteractionMeasureArea from 'ngeo/interaction/MeasureArea.js';
import ngeoInteractionMobileDraw from 'ngeo/interaction/MobileDraw.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import * as olObj from 'ol/obj.js';

/**
 * @classdesc
 * Interaction dedicated to measure Area on mobile devices.
 *
 * @constructor
 * @extends {ngeo.interaction.MeasureArea}
 * @param {!ngeox.unitPrefix} format The format function
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {ngeox.interaction.MeasureOptions=} opt_options Options
 */
const exports = function(format, gettextCatalog, opt_options) {

  const options = opt_options !== undefined ? opt_options : {};

  olObj.assign(options, {displayHelpTooltip: false});

  ngeoInteractionMeasureArea.call(this, format, gettextCatalog, options);

};

olUtilInherits(
  exports, ngeoInteractionMeasureArea);


/**
 * @inheritDoc
 */
exports.prototype.createDrawInteraction = function(style, source) {
  return new ngeoInteractionMobileDraw({
    type: /** @type {ol.geom.GeometryType} */ ('Polygon'),
    style: style,
    source: source
  });
};


export default exports;
