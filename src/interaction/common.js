import {createEditingStyle} from 'ol/style/Style.js';


/**
 * @typedef {Object} DrawEventItem
 * @property {import("ol/Feature.js").default} feature
 */


/**
 * @typedef {import("ngeo/CustomEvent.js").default<DrawEventItem>} DrawEvent
 */


/**
 * @return {import('ol/style/Style.js').StyleFunction} Styles.
 * @hidden
 */
export function getDefaultDrawStyleFunction() {
  const style = createEditingStyle();
  return function(feature, resolution) {
    const geometry = feature.getGeometry();
    if (!geometry) {
      throw new Error('Missing geometry');
    }
    return style[geometry.getType()];
  };
}


/**
 * @return {import('ol/style/Style.js').StyleFunction} Styles.
 * @hidden
 */
export function getDefaultModifyStyleFunction() {
  const style = createEditingStyle();
  return function(feature, resolution) {
    return style.Point;
  };
}
