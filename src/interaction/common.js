/**
 * @module ngeo.interaction.common
 */
const exports = {};
import {createEditingStyle} from 'ol/style/Style.js';


/**
 * @return {ol.StyleFunction} Styles.
 */
exports.getDefaultDrawStyleFunction = function() {
  const style = createEditingStyle();
  return function(feature, resolution) {
    return style[feature.getGeometry().getType()];
  };
};


/**
 * @return {ol.StyleFunction} Styles.
 */
exports.getDefaultModifyStyleFunction = function() {
  const style = createEditingStyle();
  return function(feature, resolution) {
    return style[/**@type {ol.geom.GeometryType} */ ('Point')];
  };
};


export default exports;
