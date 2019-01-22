import {createEditingStyle} from 'ol/style/Style.js';


/**
 * @typedef {import("ngeo/CustomEvent.js").default.<{
 * @property {ol.Feature} feature
 * }>} DrawEvent
 */


/**
 * @return {import("ol/StyleFunction.js").default} Styles.
 */
export function getDefaultDrawStyleFunction() {
  const style = createEditingStyle();
  return function(feature, resolution) {
    return style[feature.getGeometry().getType()];
  };
}


/**
 * @return {import("ol/StyleFunction.js").default} Styles.
 */
export function getDefaultModifyStyleFunction() {
  const style = createEditingStyle();
  return function(feature, resolution) {
    return style[/**@type {import("ol/geom/GeometryType.js").default} */ ('Point')];
  };
}
