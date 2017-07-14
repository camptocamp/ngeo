goog.provide('ngeo.jstsExports');

goog.require('ol.geom.Geometry');
goog.require('ol.geom.GeometryCollection');
goog.require('ol.geom.LineString');
goog.require('ol.geom.LinearRing');
goog.require('ol.geom.MultiLineString');
goog.require('ol.geom.MultiPoint');
goog.require('ol.geom.MultiPolygon');
goog.require('ol.geom.Point');
goog.require('ol.geom.Polygon');


goog.exportSymbol(
  'ol.geom.Geometry',
  ol.geom.Geometry);

goog.exportSymbol(
  'ol.geom.GeometryCollection',
  ol.geom.GeometryCollection);

goog.exportProperty(
    ol.geom.GeometryCollection.prototype,
    'getGeometries',
    ol.geom.GeometryCollection.prototype.getGeometries);

goog.exportSymbol(
  'ol.geom.LineString',
  ol.geom.LineString);

goog.exportProperty(
  ol.geom.LineString.prototype,
  'getCoordinates',
  ol.geom.LineString.prototype.getCoordinates);

goog.exportSymbol(
  'ol.geom.LinearRing',
  ol.geom.LinearRing);

goog.exportProperty(
  ol.geom.LinearRing.prototype,
  'getCoordinates',
  ol.geom.LinearRing.prototype.getCoordinates);

goog.exportSymbol(
  'ol.geom.MultiLineString',
  ol.geom.MultiLineString);

goog.exportProperty(
  ol.geom.MultiLineString.prototype,
  'getCoordinates',
  ol.geom.MultiLineString.prototype.getCoordinates);

goog.exportProperty(
  ol.geom.MultiLineString.prototype,
  'getLineStrings',
  ol.geom.MultiLineString.prototype.getLineStrings);

goog.exportSymbol(
  'ol.geom.MultiPoint',
  ol.geom.MultiPoint);

goog.exportProperty(
  ol.geom.MultiPoint.prototype,
  'getCoordinates',
  ol.geom.MultiPoint.prototype.getCoordinates);

goog.exportProperty(
  ol.geom.MultiPoint.prototype,
  'getPoints',
  ol.geom.MultiPoint.prototype.getPoints);

goog.exportSymbol(
  'ol.geom.MultiPolygon',
  ol.geom.MultiPolygon);

goog.exportProperty(
  ol.geom.MultiPolygon.prototype,
  'getCoordinates',
  ol.geom.MultiPolygon.prototype.getCoordinates);

goog.exportProperty(
  ol.geom.MultiPolygon.prototype,
  'getPolygons',
  ol.geom.MultiPolygon.prototype.getPolygons);

goog.exportSymbol(
  'ol.geom.Point',
  ol.geom.Point);

goog.exportProperty(
  ol.geom.Point.prototype,
  'getCoordinates',
  ol.geom.Point.prototype.getCoordinates);

goog.exportSymbol(
  'ol.geom.Polygon',
  ol.geom.Polygon);

goog.exportProperty(
  ol.geom.Polygon.prototype,
  'getLinearRings',
  ol.geom.Polygon.prototype.getLinearRings);

goog.exportProperty(
    ol.geom.Polygon.prototype,
    'getCoordinates',
    ol.geom.Polygon.prototype.getCoordinates);
