import {noModifierKeys, singleClick} from 'ol/events/condition.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomMultiPoint from 'ol/geom/MultiPoint.js';
import olGeomMultiLineString from 'ol/geom/MultiLineString.js';
import olGeomMultiPolygon from 'ol/geom/MultiPolygon.js';
import olGeomPoint from 'ol/geom/Point.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import {getTopLeft, getTopRight, getBottomLeft, getBottomRight} from 'ol/extent.js';

/**
 * Utility method that converts a simple geometry to its multi equivalent. If
 * the geometry itself is already multi, it is returned as-is.
 * @param {import("ol/geom/Geometry.js").default} geometry A geometry
 * @return {import("ol/geom/Geometry.js").default} A multi geometry
 * @hidden
 */
export function toMulti(geometry) {
  /** @type {import("ol/geom/Geometry.js").default} */
  let multiGeom;
  if (geometry instanceof olGeomPoint) {
    const multiGeomPoint = new olGeomMultiPoint([]);
    multiGeomPoint.appendPoint(geometry);
    multiGeom = multiGeomPoint;
  } else if (geometry instanceof olGeomLineString) {
    const multiGeomLine = new olGeomMultiLineString([]);
    multiGeomLine.appendLineString(geometry);
    multiGeom = multiGeomLine;
  } else if (geometry instanceof olGeomPolygon) {
    const multiGeomPolygon = new olGeomMultiPolygon([]);
    multiGeomPolygon.appendPolygon(geometry);
    multiGeom = multiGeomPolygon;
  } else {
    multiGeom = geometry;
  }
  return multiGeom;
}

/**
 * Checks if on Safari.
 * @return {boolean} True if on Safari.
 * @hidden
 */
export function isSafari() {
  return navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
}

/**
 * Takes a hex value and prepends a zero if it's a single digit.
 * @param {string} hex Hex value to prepend if single digit.
 * @return {string} hex value prepended with zero if it was single digit,
 *     otherwise the same value that was passed in.
 * @hidden
 */
export function colorZeroPadding(hex) {
  return hex.length == 1 ? `0${hex}` : hex;
}

/**
 * Converts a color from RGB to hex representation.
 * @param {!Array.<number>} rgb rgb representation of the color.
 * @return {string} hex representation of the color.
 * @hidden
 */
export function rgbArrayToHex(rgb) {
  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];
  if (r != (r & 255) || g != (g & 255) || b != (b & 255)) {
    throw Error(`"(${r},${g},${b})" is not a valid RGB color`);
  }
  const hexR = colorZeroPadding(r.toString(16));
  const hexG = colorZeroPadding(g.toString(16));
  const hexB = colorZeroPadding(b.toString(16));
  return `#${hexR}${hexG}${hexB}`;
}

/**
 * Decode the encoded query string into a query data dictionary.
 * @param {string|undefined} queryString The queryString.
 * @return {!Object.<string, string>} The result.
 * @hidden
 */
export function decodeQueryString(queryString) {
  /** @type {Object.<string, string>} */
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
}

/**
 * Encode the query data dictionary into an encoded query string.
 * @param {!Object.<string, string>} queryData The queryData,
 * @return {string} The result.
 * @hidden
 */
export function encodeQueryString(queryData) {
  const queryItem = [];
  for (const key in queryData) {
    const value = queryData[key];
    queryItem.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }
  return queryItem.join('&');
}

/**
 * Delete condition passed to the modify interaction
 * @param {import("ol/MapBrowserEvent.js").default} event Browser event.
 * @return {boolean} The result.
 * @hidden
 */
export function deleteCondition(event) {
  return noModifierKeys(event) && singleClick(event);
}

/**
 * Takes an import("ol/extent.js").Extent and return an Array of
 * ol.Coordinate representing a rectangle polygon.
 * @param {import("ol/extent.js").Extent} extent The extent.
 * @return {Array.<import("ol/coordinate.js").Coordinate>} The Array of coordinate of the rectangle.
 */
export function extentToRectangle(extent) {
  const result = [
    getTopLeft(extent),
    getTopRight(extent),
    getBottomRight(extent),
    getBottomLeft(extent),
    getTopLeft(extent),
  ];
  return result;
}
