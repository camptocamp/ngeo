/**
 * @module ngeo.interaction.common
 */
const exports = {};
import {createEditingStyle} from 'ol/style/Style.js';


/**
 * @typedef {ngeo.CustomEvent.<{
 *   feature: ol.Feature
 * }>} DrawEvent
 */


/**
 * @return {import("ol/StyleFunction.js").default} Styles.
 */
exports.getDefaultDrawStyleFunction = function() {
  const style = createEditingStyle();
  return function(feature, resolution) {
    return style[feature.getGeometry().getType()];
  };
};


/**
 * @return {import("ol/StyleFunction.js").default} Styles.
 */
exports.getDefaultModifyStyleFunction = function() {
  const style = createEditingStyle();
  return function(feature, resolution) {
    return style[/**@type {import("ol/geom/GeometryType.js").default} */ ('Point')];
  };
};


export default exports;
