/**
 * @module ngeo.misc.AutoProjection
 */
import * as olProj from 'ol/proj.js';
import * as olExtent from 'ol/extent.js';

/**
 * @constructor
 * @struct
 * @ngdoc service
 * @ngname ngeoAutoProjection
 */
const exports = function() {};


/**
 * Parse a string and return a coordinate if the result is valid. Given string
 * must be a two numbers separated by a space.
 * @param {string} str the string to parse.
 * @return {?ol.Coordinate} A coordinate or null if the format is not valid.
 * @export
 */
exports.prototype.stringToCoordinates = function(str) {
  const coords = str.match(/([\d\.']+)[\s,]+([\d\.']+)/);
  if (coords) {
    const x = parseFloat(coords[1].replace('\'', ''));
    const y = parseFloat(coords[2].replace('\'', ''));
    if (!isNaN(x) && !isNaN(y)) {
      return [x, y];
    }
  }
  return null;
};


/**
 * Get an array of projections corresponding to their EPSG codes. Log an error
 *     for each code that are not defined in ol projections.
 * @param {Array.<string>} projectionsCodes EPSG codes (e.g. 'EPSG:3857',
 *     'epsg:3857' or '3857').
 * @return {Array.<ol.proj.Projection>} An array of projections.
 * @export
 */
exports.prototype.getProjectionList = function(projectionsCodes) {
  let code, proj;
  const projections = [];
  projectionsCodes.forEach((projection) => {
    code = projection.toUpperCase();
    if (code.substr(0, 5) != 'EPSG:') {
      code = `EPSG:${code}`;
    }
    proj = olProj.get(code);
    if (proj !== null) {
      projections.push(proj);
    } else {
      console.error(`The projection ${code} is not defined in ol.proj.`);
    }
  });
  return projections;
};


/**
 * It projects the point using the projection array and finds the first one for
 * which it falls inside of the viewProjection extent.
 * @param {ol.Coordinate} coordinates The point to test.
 * @param {ol.Extent} extent Limits in which coordinates can be valid.
 * @param {ol.proj.Projection} viewProjection Target projection the point.
 * @param {Array.<ol.proj.Projection>=} opt_projections optional array of
 *     projections. The point is tested in each projection, in the order of
 *     the array.
 * @return {?ol.Coordinate} A coordinates in the view's projection if it matches
 *     in one of the given projections, or null else.
 * @export
 */
exports.prototype.tryProjections = function(coordinates,
  extent, viewProjection, opt_projections) {
  let position;
  if (opt_projections === undefined) {
    opt_projections = [viewProjection];
  }
  opt_projections.some((projection) => {
    try {
      position = olProj.transform(coordinates, projection, viewProjection);
      if (olExtent.containsCoordinate(extent, position)) {
        return true;
      }
    } catch (e) {
      // wrong transform may throw an exception
      console.log(e);
    }
    position = null;
  });
  return position;
};


/**
 * Same as AutoProjection.tryProjections but if tryProjections return null,
 * re-call it with coordinates in reverse order.
 * @param {ol.Coordinate} coordinates The point to test.
 * @param {ol.Extent} extent Limits in which coordinates can be valid.
 * @param {ol.proj.Projection} viewProjection Target projection the point.
 * @param {Array.<ol.proj.Projection>=} opt_projections optional array of
 *     projections. The point is tested in each projection, in the order of
 *     the array.
 * @return {?ol.Coordinate} A coordinates in the view's projection if it matches
 *     in one of the given projections, or null else.
 * @export
 */
exports.prototype.tryProjectionsWithInversion = function(
  coordinates, extent, viewProjection, opt_projections) {
  let position = this.tryProjections(coordinates, extent, viewProjection,
    opt_projections);
  if (position === null) {
    position = this.tryProjections(coordinates.reverse(), extent,
      viewProjection, opt_projections);
  }
  return position;
};


/**
 * @type {!angular.Module}
 */
exports.module = angular.module('ngeoAutoProjection', []);
exports.module.service('ngeoAutoProjection', exports);


export default exports;
