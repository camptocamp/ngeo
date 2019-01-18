/**
 */
const exports = {};
import {createEditingStyle} from 'ol/style/Style.js';


/**
 * @typedef {import("ngeo/CustomEvent.js").default.<{
 *   feature: ol.Feature
 * }>} DrawEvent
 */


/**
 * @return {import("ol/StyleFunction.js").default} Styles.
 */
function getDefaultDrawStyleFunction() {
  const style = createEditingStyle();
  return function(feature, resolution) {
    return style[feature.getGeometry().getType()];
  };
};


/**
 * @return {import("ol/StyleFunction.js").default} Styles.
 */
function getDefaultModifyStyleFunction() {
  const style = createEditingStyle();
  return function(feature, resolution) {
    return style[/**@type {import("ol/geom/GeometryType.js").default} */ ('Point')];
  };
};


export default exports;
