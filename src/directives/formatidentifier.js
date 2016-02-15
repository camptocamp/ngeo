goog.provide('ngeo.formatIdentify');

goog.require('ol.format.GeoJSON');
goog.require('ol.format.KML');
goog.require('ol.format.WMSCapabilities');
goog.require('ol.format.WMTSCapabilities');


/**
 * @param {string} object
 * @return {(null|function(new:Object))}
 */
ngeo.formatIdentify = function(object) {
  if (object.length < 1) {
    return null;
  }
  var firsts = object.substr(0, 5);
  var firstCharacter = object[0];
  if (firstCharacter === '{') {
    return ol.format.GeoJSON;
  } else if (firstCharacter === '<') {
    if (firsts.indexOf('<Cap') === 0) {
      // <Capabilities xmlns="http://www.opengis.net/wmts/1.0
      return ol.format.WMTSCapabilities;
    } else if (firsts.indexOf('<WMS') === 0) {
      // <WMS_Capabilities xmlns="http://www.opengis.net/wms"
      return ol.format.WMSCapabilities;
    } else {
      return ol.format.KML;
    }
  } else {
    return null;
  }
};
