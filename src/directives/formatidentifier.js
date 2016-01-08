goog.provide('ngeo.formatIdentify');

goog.require('ol.format.GeoJSON');
goog.require('ol.format.KML');


/**
 * @param {string} object
 * @return {(null|function(new:ol.format.Feature))}
 */
ngeo.formatIdentify = function(object) {
  var firstCharacter = object[0];
  if (firstCharacter === '{') {
    return ol.format.GeoJSON;
  } else if (firstCharacter === '<') {
    return ol.format.KML;
  } else {
    return null;
  }
};
