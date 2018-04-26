/**
 * @module ngeo.utils
 */
const exports = {};
import * as olEventsCondition from 'ol/events/condition.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomMultiPoint from 'ol/geom/MultiPoint.js';
import olGeomMultiLineString from 'ol/geom/MultiLineString.js';
import olGeomMultiPolygon from 'ol/geom/MultiPolygon.js';
import olGeomPoint from 'ol/geom/Point.js';
import olGeomPolygon from 'ol/geom/Polygon.js';


/**
 * Utility method that converts a simple geometry to its multi equivalent. If
 * the geometry itself is already multi, it is returned as-is.
 * @param {ol.geom.Geometry} geometry A geometry
 * @return {ol.geom.Geometry} A multi geometry
 */
exports.toMulti = function(geometry) {
  let multiGeom;
  if (geometry instanceof olGeomPoint) {
    multiGeom = new olGeomMultiPoint([]);
    multiGeom.appendPoint(geometry);
  } else if (geometry instanceof olGeomLineString) {
    multiGeom = new olGeomMultiLineString([]);
    multiGeom.appendLineString(geometry);
  } else if (geometry instanceof olGeomPolygon) {
    multiGeom = new olGeomMultiPolygon([]);
    multiGeom.appendPolygon(geometry);
  } else {
    multiGeom = geometry;
  }
  return multiGeom;
};

/**
 * Checks if on Safari.
 * @return {boolean} True if on Safari.
 */
exports.isSafari = function() {
  return navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
};

/**
 * Takes a hex value and prepends a zero if it's a single digit.
 * @param {string} hex Hex value to prepend if single digit.
 * @return {string} hex value prepended with zero if it was single digit,
 *     otherwise the same value that was passed in.
 */
exports.colorZeroPadding = function(hex) {
  return hex.length == 1 ? `0${hex}` : hex;
};

/**
 * Converts a color from RGB to hex representation.
 * @param {!Array.<number>} rgb rgb representation of the color.
 * @return {string} hex representation of the color.
 */
exports.rgbArrayToHex = function(rgb) {
  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];
  if (r != (r & 255) || g != (g & 255) || b != (b & 255)) {
    throw Error(`"(${r},${g},${b})" is not a valid RGB color`);
  }
  const hexR = exports.colorZeroPadding(r.toString(16));
  const hexG = exports.colorZeroPadding(g.toString(16));
  const hexB = exports.colorZeroPadding(b.toString(16));
  return `#${hexR}${hexG}${hexB}`;
};

/**
 * Decode the encoded query string into a query data dictionary.
 * @param {string|undefined} queryString The queryString.
 * @return {!Object.<string, string>} The result.
 */
exports.decodeQueryString = function(queryString) {
  const queryData = {};
  if (queryString) {
    const pairs = queryString.substring(1).split('&');
    for (const pair of pairs) {
      const indexOfEquals = pair.indexOf('=');
      if (indexOfEquals >= 0) {
        const name = pair.substring(0, indexOfEquals);
        const value = pair.substring(indexOfEquals + 1);
        queryData[decodeURIComponent(name)] = decodeURIComponent(value);
      } else {
        queryData[pair] = '';
      }
    }
  }
  return queryData;
};

/**
 * Encode the query data dictionary into an encoded query string.
 * @param {!Object.<string, string>} queryData The queryData,
 * @return {string} The result.
 */
exports.encodeQueryString = function(queryData) {
  const queryItem = [];
  for (const key in queryData) {
    const value = queryData[key];
    queryItem.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }
  return queryItem.join('&');
};


/**
 * Delete condition passed to the modify interaction
 * @param {ol.MapBrowserEvent} event Browser event.
 * @return {boolean} The result.
 */
exports.deleteCondition = function(event) {
  return olEventsCondition.noModifierKeys(event) && olEventsCondition.singleClick(event);
};


export default exports;
