goog.provide('ngeo.geom');

goog.require('ngeo.coordinate');
goog.require('ol.geom.LineString');
goog.require('ol.geom.MultiLineString');
goog.require('ol.geom.MultiPoint');
goog.require('ol.geom.MultiPolygon');
goog.require('ol.geom.Point');
goog.require('ol.geom.Polygon');
goog.require('ol.geom.SimpleGeometry');


/**
 * Determines whether a given geometry is empty or not. A null or undefined
 * value can be given for convenience, i.e. when using methods than can
 * return a geometry or not, for example:
 * `ngeo.geom.isEmpty(feature.getGeometry())`.
 *
 * @param {?ol.geom.Geometry|undefined} geom Geometry.
 * @return {boolean} Whether the given geometry is empty or not. A null or
 *     undefined geometry is considered empty.
 */
ngeo.geom.isEmpty = function(geom) {
  let isEmpty = true;
  if (geom && geom instanceof ol.geom.SimpleGeometry) {
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
ngeo.geom.toXY = function(geom) {
  if (geom instanceof ol.geom.Point) {
    geom.setCoordinates(
      ngeo.coordinate.toXY(geom.getCoordinates(), 0)
    );
  } else if (geom instanceof ol.geom.MultiPoint ||
             geom instanceof ol.geom.LineString
  ) {
    geom.setCoordinates(
      ngeo.coordinate.toXY(geom.getCoordinates(), 1)
    );
  } else if (geom instanceof ol.geom.MultiLineString ||
             geom instanceof ol.geom.Polygon
  ) {
    geom.setCoordinates(
      ngeo.coordinate.toXY(geom.getCoordinates(), 2)
    );
  } else if (geom instanceof ol.geom.MultiPolygon) {
    geom.setCoordinates(
      ngeo.coordinate.toXY(geom.getCoordinates(), 3)
    );
  } else {
    throw 'ngeo.geom.toXY - unsupported geometry type';
  }
};
