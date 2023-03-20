import {createEditingStyle} from 'ol/style/Style.js';

/**
 * @typedef {Object} DrawEventItem
 * @property {import("ol/Feature.js").default} feature
 */

/**
 * @typedef {import("ngeo/CustomEvent.js").default.<DrawEventItem>} DrawEvent
 */

/**
 * @return {import('ol/style/Style.js').StyleFunction} Styles.
 * @hidden
 */
export function getDefaultDrawStyleFunction() {
  const style = createEditingStyle();
  return function (feature, resolution) {
    return style[feature.getGeometry().getType()];
  };
}

/**
 * @return {import('ol/style/Style.js').StyleFunction} Styles.
 * @hidden
 */
export function getDefaultModifyStyleFunction() {
  const style = createEditingStyle();
  return function (feature, resolution) {
    return style[/**@type {import("ol/geom/GeometryType.js").default} */ ('Point')];
  };
}
