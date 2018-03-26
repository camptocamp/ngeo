goog.provide('ngeo.interaction.common');

goog.require('ol.style.Style');


/**
 * @return {ol.StyleFunction} Styles.
 */
ngeo.interaction.common.getDefaultDrawStyleFunction = function() {
  const style = ol.style.Style.createDefaultEditing();
  return function(feature, resolution) {
    return style[feature.getGeometry().getType()];
  };
};


/**
 * @return {ol.StyleFunction} Styles.
 */
ngeo.interaction.common.getDefaultModifyStyleFunction = function() {
  const style = ol.style.Style.createDefaultEditing();
  return function(feature, resolution) {
    return style[/**@type {ol.geom.GeometryType} */ ('Point')];
  };
};
