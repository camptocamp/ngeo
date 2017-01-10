goog.provide('ngeo.utils');

goog.require('ol.geom.LineString');
goog.require('ol.geom.MultiPoint');
goog.require('ol.geom.MultiLineString');
goog.require('ol.geom.MultiPolygon');
goog.require('ol.geom.Point');
goog.require('ol.geom.Polygon');


/**
 * Utility method that converts a simple geometry to its multi equivalent. If
 * the geometry itself is already multi, it is returned as-is.
 * @param {ol.geom.Geometry} geometry A geometry
 * @return {ol.geom.Geometry} A multi geometry
 */
ngeo.utils.toMulti = function(geometry) {
  let multiGeom;
  if (geometry instanceof ol.geom.Point) {
    multiGeom = new ol.geom.MultiPoint([]);
    multiGeom.appendPoint(geometry);
  } else if (geometry instanceof ol.geom.LineString) {
    multiGeom = new ol.geom.MultiLineString([]);
    multiGeom.appendLineString(geometry);
  } else if (geometry instanceof ol.geom.Polygon) {
    multiGeom = new ol.geom.MultiPolygon([]);
    multiGeom.appendPolygon(geometry);
  } else {
    multiGeom = geometry;
  }
  return multiGeom;
};
