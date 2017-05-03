goog.provide('ngeo.geom');

goog.require('ngeo.coordinate');


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
