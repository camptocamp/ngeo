/**
 * @module gmf.objectediting.geom
 */
const exports = {};
import gmfObjecteditingCoordinate from 'gmf/objectediting/coordinate.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomMultiLineString from 'ol/geom/MultiLineString.js';
import olGeomMultiPoint from 'ol/geom/MultiPoint.js';
import olGeomMultiPolygon from 'ol/geom/MultiPolygon.js';
import olGeomPoint from 'ol/geom/Point.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import olGeomSimpleGeometry from 'ol/geom/SimpleGeometry.js';


/**
 * Determines whether a given geometry is empty or not. A null or undefined
 * value can be given for convenience, i.e. when using methods than can
 * return a geometry or not, for example:
 * `gmf.objectediting.geom.isEmpty(feature.getGeometry())`.
 *
 * @param {?ol.geom.Geometry|undefined} geom Geometry.
 * @return {boolean} Whether the given geometry is empty or not. A null or
 *     undefined geometry is considered empty.
 */
exports.isEmpty = function(geom) {
  let isEmpty = true;
  if (geom && geom instanceof olGeomSimpleGeometry) {
    isEmpty = geom.getFlatCoordinates().length === 0;
  }
  return isEmpty;
};


/**
 * Convert all coordinates within a geometry object to XY, i.e. remove any
 * extra dimension other than X and Y to the coordinates of a geometry.
 *
 * @param {ol.geom.Geometry} geom Geometry
 */
exports.toXY = function(geom) {
  if (geom instanceof olGeomPoint) {
    geom.setCoordinates(
      gmfObjecteditingCoordinate.toXY(geom.getCoordinates(), 0)
    );
  } else if (geom instanceof olGeomMultiPoint ||
             geom instanceof olGeomLineString
  ) {
    geom.setCoordinates(
      gmfObjecteditingCoordinate.toXY(geom.getCoordinates(), 1)
    );
  } else if (geom instanceof olGeomMultiLineString ||
             geom instanceof olGeomPolygon
  ) {
    geom.setCoordinates(
      gmfObjecteditingCoordinate.toXY(geom.getCoordinates(), 2)
    );
  } else if (geom instanceof olGeomMultiPolygon) {
    geom.setCoordinates(
      gmfObjecteditingCoordinate.toXY(geom.getCoordinates(), 3)
    );
  } else {
    throw 'gmf.objectediting.geom.toXY - unsupported geometry type';
  }
};


export default exports;
